import { Field, Form, Formik, FormikHelpers } from 'formik';
import { SubmitValues } from '../types/submit';
import toast from 'react-hot-toast';

import clsx from 'clsx';
import css from './SearchBar.module.css';

const FormValues: SubmitValues = {
  query: "",
};

interface Props {
  onSearch: (arg0: string) => void;
}

export default function SearchBar({onSearch}: Props) {

    const handleSubmit = (values: SubmitValues, actions: FormikHelpers<SubmitValues>) => {
        const trimmedQuery = values.query.trim();

        if (trimmedQuery === '') {
            toast.error("Please enter text to search for images.");
            return;
        }

        onSearch(trimmedQuery);
        actions.resetForm();
    }

    return (
        <Formik
      initialValues={FormValues}
      onSubmit={handleSubmit}
        >
        <Form className={clsx(css.form)} >
        <Field className={clsx(css.field)} type="text" name="query"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos" />
        <button className={clsx(css.button)} type="submit">Search</button>
            </Form>
    </Formik>
    ) 
}