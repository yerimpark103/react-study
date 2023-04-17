import {gql, GraphQLClient} from "graphql-request";

const RESTORE_ACCESS_TOKEN = gql`
  mutation restoreAccessToken {
    restoreAccessToken {
      accessToken
    }
  }
`;

export const getAccessToken = async () => {
  try {
    // refreshToken으로 accessToken을 재발급 받기
    const graphQLClient = new GraphQLClient(
      "https://backendonline.codebootcamp.co.kr/graphql",
      {credentials: "include"}
    );
    const result = await graphQLClient.request(RESTORE_ACCESS_TOKEN);
    const newAccessToken = result.restoreAccessToken.accessToken;
    return newAccessToken;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};
