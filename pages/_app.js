import withTwindApp from '@twind/next/app'
import { QueryClientProvider, QueryClient } from 'react-query'
import '../components/GlobalStyles.scss'
import Layout from '../components/Layout'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 200*1000
      }
    }
  })

  return (
    <QueryClientProvider client={queryClient}>
      <Layout >
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default withTwindApp(MyApp)