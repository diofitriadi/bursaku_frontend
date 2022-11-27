import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

const Dashboard = () => {

  const [product, setProduct] = useState([{}])
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(0)
  const [pageLimit] = useState(10)
  const [editProduct, setEditProduct] = useState([{}])
  const [refetch, setRefetch] = useState(false)

  // Get Data
  const handleGet = async (page, limit) => {
    axios
      .get(`http://localhost:3500/api/products?page=${page}&limit=${limit}`)
      .then((res) => {
        setProduct(res.data.results);
      })
      .catch((err) => console.log(err));
  }

  // Update Data
  const handleUpdate = async (id) => {
    try {
      const result = await axios({
        method: "PATCH",
        data: editProduct,
        url: `http://localhost:3500/api/products/${id}`
      })
      if (result) {
        alert(`Successfully Updated`)
        setRefetch(!refetch)
      }
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    handleGet(1, 1000)
  }, [])

  // sort
  const sortedProduct = [...product].sort((a, b) => a.product_name > b.product_name ? 1 : -1,);
  console.log(sortedProduct, "hahahaha");

  const handleLogout = async (e) => {
    e.preventDefault()
    localStorage.clear()
    navigate('/', { replace: true })
  }


  // Handle Filter
  const allCategories = ['semua tipe', ...new Set(product.map((item) => item.productType))];
  const [categories, setCategories] = useState(allCategories);
  const filterItems = (productType) => {
    const newItems = product.filter((item) => item.productType === productType);
    setProduct(newItems)
    if (productType === 'semua tipe') {
      setProduct(product)
      return
    }
  };


  return (
    <>
      <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] text-sm">
        <div>
          <div className="-mx-6 px-6 py-4">
            <img src="./bursaku.png" className="w-32" alt="bursaku logo" />
          </div>
          <ul className="space-y-2 tracking-wide mt-2">
            <li>
              <button className="w-full -mr-1 font-medium relative px-4 py-2 flex items-center space-x-4 rounded-sm hover:bg-[#017EFF] text-[#017EFF] hover:text-white transition">Dashboard</button>
            </li>
            <li>
              <button className="w-full px-4 py-2 flex items-center space-x-4 rounded-sm group hover:bg-[#017EFF] text-[#017EFF] hover:text-white transition">Categories</button>
            </li>
            <li>
              <button className="w-full  px-4 py-2 flex items-center space-x-4 rounded-sm group hover:bg-[#017EFF] text-[#017EFF] hover:text-white transition">Reports</button>
            </li>
            <li>
              <button className="w-full px-4 py-2 flex items-center space-x-4 rounded-sm group hover:bg-[#017EFF] text-[#017EFF] hover:text-white transition">Other data</button>
            </li>
            <li>
              <button className="w-full px-4 py-2 flex items-center space-x-4 rounded-sm bg-[#017EFF]  text-white transition group">Produk 1</button>
            </li>
            <div className='border-b w-[100%] pt-4' ></div>
          </ul>
        </div>

        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
            <svg xmlns="logout" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="group-hover:text-gray-700"
              onClick={(e) => handleLogout(e)}
            >Logout</span>
          </button>
        </div>
      </aside>
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] text-sm">
        <div className="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
          <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
            <h5 className="text-2xl text-gray-600 font-medium lg:block">Dashboard</h5>
            <h4>JOHN DOE</h4>
          </div>
        </div>
        <div className='m-5 border-2 h-[170px]'>
          <div className='flex items-center'>
            <div className='bg-gray-300 rounded-full w-[80px] mt-5 ml-5 h-20 p-5'></div>
            <h1 className='text-gray-600 ml-4 text-lg font-bold pt-4'>Partner 1</h1>
          </div>
          <div className='flex'>
            <button className='pl-5 pt-7'>Semua Produk</button>
            <button className='pl-5 pt-7'>Update Produk</button>
          </div>
        </div>
        <div className='m-5 p-2 border-2 h-[48px]'>
          <div className='flex justify-around items-center'>
            <p>Tipe : </p>
            <select className='p-1 rounded-md cursor-pointer'>
              {allCategories.map((productType, index) => {
                return (
                  <option key={index}
                    onClick={() => filterItems(productType)}
                  >
                    {productType}
                  </option>
                );
              })}
            </select>
            <p>Operator : </p>
            <select className='p-1 rounded-md cursor-pointer'>
              <option>Semua Operator</option>
              <option>Multi</option>
              <option>Zakat</option>
            </select>
            <p>Cari :</p>
            <input type="text" placeholder='cari' className='px-2 border-2' />
          </div>
        </div>
        <div className="p-5 pt-0 text-sm">
          <table className="table-auto w-full">
            <thead className="">
              <tr className=" bg-[#017EFF] text-white">
                <th className="">Nama Produk</th>
                <th className="">Tipe Produk</th>
                <th className=" ">Operator</th>
                <th className=" ">Nama Partner</th>
                <th className=" ">Harga Awal</th>
                <th className=''>Update Terakhir</th>
              </tr>
            </thead>
            <tbody className=" text-center bg-white text-black">
              {sortedProduct.map((item, index) => {
                return (
                  <>
                    <tr className="border-b mb-2" key={index}>
                      <td className="">{item.product_name || item.productName}</td>
                      <td className="">{item.productType}</td>
                      <td className="">{item.operator}</td>
                      <td className="">{item.partnerName || item.parnerName}</td>
                      <td className="">Rp.{item.basePrice},-</td>
                      <td className=''>{moment(item.updatedAt).format('DD MMMM YYYY, HH:mm:ss')}</td>
                    </tr>
                  </>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Dashboard