import { Route, Routes } from 'react-router'
import PageLayout from './components/templates/PageLayout/index.jsx'
import ProductsPage from './components/pages/ProductsPage/index.jsx'
import ProductDetailPage from './components/pages/ProductDetailPage/index.jsx'
import './App.css'

export default function App() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route index element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductDetailPage />} />
      </Route>
    </Routes>
  )
}
