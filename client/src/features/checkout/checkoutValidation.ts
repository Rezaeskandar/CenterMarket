import * as yup from 'yup';

export const validationSchema = yup.object({
    fullName: yup.string().required('Full name is required'),
    address1: yup.string().required('Adress 1 is required'),
    address2: yup.string().required('Adress 2 is required'),
    city: yup.string().required(),
    state: yup.string().required(),
    Zip: yup.string().required(),
    countery: yup.string().required(),

})