import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../../context/AuthContext'

const schema = Yup.object({
  first_name: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Min 6 characters').required('Required'),
})

export default function Register () {
  const { register } = useAuth()

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='w-full max-w-md bg-white shadow rounded p-6'>
        <h1 className='text-2xl font-semibold mb-4'>Register</h1>
        <Formik
          initialValues={{ email: '', password: '', first_name: '', last_name: '' }}
          validationSchema={schema}
          onSubmit={async (values, { setFieldError }) => {
            try {
              await register(values)
            } catch (e) {
              setFieldError('email', e?.response?.data?.message || 'Registration failed')
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className='space-y-4'>
              <div>
                <label className='block text-sm mb-1'>Email</label>
                <Field name='email' type='email' className='w-full border rounded px-3 py-2' />
                <ErrorMessage name='email' component='div' className='text-red-500 text-sm' />
              </div>
              <div className='grid grid-cols-2 gap-2'>
                <div>
                  <label className='block text-sm mb-1'>First name</label>
                  <Field name='first_name' className='w-full border rounded px-3 py-2' />
                  <ErrorMessage name='first_name' component='div' className='text-red-500 text-sm' />
                </div>
                <div>
                  <label className='block text-sm mb-1'>Last name</label>
                  <Field name='last_name' className='w-full border rounded px-3 py-2' />
                  <ErrorMessage name='last_name' component='div' className='text-red-500 text-sm' />
                </div>
              </div>
              <div>
                <label className='block text-sm mb-1'>Password</label>
                <Field name='password' type='password' className='w-full border rounded px-3 py-2' />
                <ErrorMessage name='password' component='div' className='text-red-500 text-sm' />
              </div>
              <button type='submit' disabled={isSubmitting} className='w-full bg-primary-600 text-white py-2 rounded'>
                {isSubmitting ? 'Loading...' : 'Create account'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
