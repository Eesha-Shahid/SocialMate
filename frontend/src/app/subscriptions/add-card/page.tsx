'use client'
import Sidebar from "@/components/Sidebar";
import UserHandler from "@/handlers/UserHandlers";
import { CardInfomration } from "@/types/User";
import { Field, Form, Formik, FormikHelpers } from "formik";

const AddCard = () => {
    const { handleAddCard } = UserHandler();

    const months = Array.from({ length: 12 }, (_, index) => index + 1); // Array of numbers 1 to 12
    const years = Array.from({ length: 10 }, (_, index) => new Date().getFullYear() + index); // Array of 10 future years

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ padding: '20px' }}>
                <h1>Add New Card</h1>
                <Formik
                    initialValues={{ cardNumber: "", expMonth: -1, expYear: -1, cvc: "" }}
                    onSubmit={(values: CardInfomration, { setSubmitting }: FormikHelpers<CardInfomration>) => {
                        setTimeout(() => {
                            handleAddCard(values);
                            setSubmitting(false);
                        }, 500);
                    }}
                >
                    <Form>
                        <label htmlFor='cardNumber'>Card Number</label>
                        <Field style={fieldStyles} id="cardNumber" type="text" name="cardNumber" placeholder='Enter card number' required />
                        <br />
                        <label htmlFor="expMonth">Expiration Month</label>
                        <Field as="select" style={fieldStyles} id="expMonth" name="expMonth" required>
                            <option value={-1} disabled>Select Month</option>
                            {months.map(month => (
                                <option key={month} value={month}>{month}</option>
                            ))}
                        </Field>
                        <br />
                        <label htmlFor="expYear">Expiration Year</label>
                        <Field as="select" style={fieldStyles} id="expYear" name="expYear" required>
                            <option value={-1} disabled>Select Year</option>
                            {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </Field>
                        <br />
                        <label htmlFor='cvc'>CVC</label>
                        <Field style={fieldStyles} id="cvc" type="text" name="cvc" placeholder='Enter cvc' required />
                        <br />
                        <button style={buttonStyle} type="submit">Add</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

const fieldStyles = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '5px',
    paddingRight: '120px',
    margin: '8px 0',
    minHeight: '30px',
    display: 'flex',
    alignItems: 'center',
};

const buttonStyle: React.CSSProperties = {
    backgroundColor: 'black',
    border: 'none',
    color: 'white',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '20px',
};

export default AddCard;
