import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../../context/AuthContext'

const schema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
})

export default function Login () {
  const { login } = useAuth()

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='w-full max-w-md bg-white shadow rounded p-6'>
        <h1 className='text-2xl font-semibold mb-4'>Login</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={schema}
          onSubmit={async (values, { setFieldError }) => {
            try {
              await login(values)
            } catch (e) {
              setFieldError('password', e?.response?.data?.message || 'Invalid email or password')
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
              <div>
                <label className='block text-sm mb-1'>Password</label>
                <Field name='password' type='password' className='w-full border rounded px-3 py-2' />
                <ErrorMessage name='password' component='div' className='text-red-500 text-sm' />
              </div>
              <button type='submit' disabled={isSubmitting} className='w-full bg-primary-600 text-white py-2 rounded'>
                {isSubmitting ? 'Loading...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
