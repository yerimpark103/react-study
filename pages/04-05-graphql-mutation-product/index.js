import {gql, useMutation} from '@apollo/client';

const CREATE_PRODUCT = gql`
  mutation createProduct(
    $seller: String
    $createProductInput: CreateProductInput!
  ) {
    # Variable types
    createProduct(seller: $seller, createProductInput: $createProductInput) {
      # Actual variables
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationPage() {
  const [myFunction] = useMutation(CREATE_PRODUCT);

  const onClickSubmit = async () => {
    const result = await myFunction({
      variables: {
        seller: 'Evie',
        createProductInput: {
          name: 'Churu',
          detail: 'Yummy',
          price: 3000,
        },
      },
    });
    console.log(result.data);
    alert(result.data.createProduct.message);
  };

  return (
    <>
      <button onClick={onClickSubmit}>GRAPHQL-API 동기 요청하기</button>
    </>
  );
}
