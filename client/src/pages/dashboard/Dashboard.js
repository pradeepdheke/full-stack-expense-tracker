import React, { useEffect, useState } from "react";
import { Alert, Col, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CustomTable } from "../../components/custome-table/CustomTable";
import { ExpensesForm } from "../../components/expenses-form/ExpensesForm";
import { MainLayout } from "../../components/layout/MainLayout";
import { deleteExpense, getExpense, postExpense } from "../../helpers/axiosHelper";

export const Dashboard = () => {
	const navigate = useNavigate();
	const [resp, setResp] = useState({
		status: "",
		message: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	

	useEffect(() => {
		const user = JSON.parse(sessionStorage.getItem("user"));
		if (!user?._id) {
			navigate("/");
		}
		// fetchExpenses();
	}, [navigate]);

	
	const handleOnPost = async frmDt => {
		setIsLoading(true);
		const data = await postExpense(frmDt);
		console.log(data);
		setIsLoading(false);
		setResp(data);
		// data.status === "success" && fetchExpenses();
		//call the api
	};

	const handleOnDelete = async _id => {
		if (!window.confirm("Are you sure you want to delete this expense?"))
			return;

		const data = await deleteExpense(_id);

		// data.status === "success" && fetchExpenses();

		setResp(data);
	};

 
	return (
		<MainLayout>
			<div>Dashboard</div>
			<hr />
			<Row className="mb-5">
				<Col>
					{isLoading && <Spinner variant="primary" animation="border" />}

					{resp?.message && (
						<Alert variant={resp.status === "success" ? "success" : "danger"}>
							{resp?.message}
						</Alert>
					)}
				</Col>
			</Row>
			<ExpensesForm handleOnPost={handleOnPost} />

			<CustomTable   handleOnDelete={handleOnDelete} />
		</MainLayout>
	);
};
