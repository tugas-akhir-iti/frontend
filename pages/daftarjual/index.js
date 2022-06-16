import Head from "next/head";
import ItemCard from "../../components/itemCard";
import MainLayout from "../../layout/mainLayout";

export default function DaftarJual() {
  return (
    <>
      <Head>
        <title>Daftar Jual Saya</title>
        <meta name="description" content="Daftar barang jual saya" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        <div className="p-2">

        <h1 className="mx-auto">Daftar Jual Saya</h1>

        <div className="card d-flex flex-row p-2">
          <img src="pp.jpg" alt="pp" />
          <div className="flex-fill">
            <h3>Nama Penjual</h3>
            <p>Kota</p>
          </div>
          <button>Edit</button>
        </div>
        </div>

        <div className="">
          <div className="p-1">
            list category
          </div>

          <div className="p-2 row">
            <div className="col-6 col-md-4">
              <button className="">
              <p>Tambah Produk</p>
              </button>
            </div>
            <div className="col-6 col-md-4">
              <ItemCard></ItemCard>
            </div>
            <div className="col-6 col-md-4">
              <ItemCard></ItemCard>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
