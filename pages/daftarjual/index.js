import Head from "next/head";
import CategoryCard from "../../components/categoryCard";
import ItemCard from "../../components/itemCard";
import OwnerCard from "../../components/ownerCard";
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

          <OwnerCard
            foto="dummypp.jpg"
            fotoalt="fotoalt"
            isOwner={true}
            nama="Lorem"
            kota="ipsum"
          />
        </div>

        <div className="container-fluid p-0 ">
          <div className="container-fluid p-0">
            <div
              className="overflow-auto d-flex gap-2"
              style={{ whiteSpace: "nowrap" }}
            >
              <CategoryCard icon="box" text="Tambah" />
              <CategoryCard icon="heart" text="Diminati" />
              <CategoryCard icon="currency-dollar" text="Terjual" />
            </div>
          </div>

          <div className="container-fluid m-0 row p-1 g-2">
            <div className="col-6 col-md-4 d-flex">
              <button
                className="flex-fill d-flex flex-column rounded"
                style={{
                  borderStyle: "dashed",
                  borderWidth: "2px",
                  borderColor: "lightgray",
                  color: "gray",
                }}
              >
                <i
                  className="bi bi-plus mx-auto"
                  style={{ fontSize: "2rem" }}
                ></i>
                <p className="mx-auto">Tambah Produk</p>
              </button>
            </div>

            <div className="col-6 col-md-4">
              <ItemCard></ItemCard>
            </div>
            <div className="col-6 col-md-4">
              <ItemCard></ItemCard>
            </div>
            <div className="col-6 col-md-4">
              <ItemCard></ItemCard>
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
