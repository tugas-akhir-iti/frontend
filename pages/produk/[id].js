import Produk from "./index.js";

export const getStaticPaths = async () => {
  const res = await fetch('https://kelompok4-yateam.herokuapp.com/products');
  const response = await res.json();

  // map data to an array of path objects with params (id)
  const paths = response.data.map(product => {
    return {
      params: { id: product.id.toString() }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch('https://kelompok4-yateam.herokuapp.com/products/' + id);
  const response = await res.json();

  return {
    props: { product: response.data }
  }
}

const Details = ({ product }) => {
  return (
    <>
      <Produk product_id={product.id} product_name={product.product_name} product_description={product.product_description} product_price={product.product_price} product_image={product.product_image}
        user_image={product.User.user_image} user_name={product.User.user_name} user_regency={product.User.user_regency}
        category_name={product.Category.category_name}
      />

    </>
  );
}

export default Details;