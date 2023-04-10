// import { withAuth } from "@/components/commons/hocs/withAuth";

import {useAuth} from "@/components/commons/hooks/useAuth";

export default function CustomHooksUseAuthPage() {
  useAuth();
  return (
    <>
      <h1>프로필 페이지입니다.</h1>
    </>
  );
}

// export default withAuth(CustomHooksUseAuthPage)
