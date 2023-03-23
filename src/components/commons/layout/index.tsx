import styled from "@emotion/styled";
import {useRouter} from "next/router";

import LayoutBanner from "./banner";
import LayoutFooter from "./footer";
import LayoutHeader from "./header";
import LayoutNavigation from "./navigation";
import LayoutSidebar from "./sidebar";

const HIDDEN_HEADERS = ["/12-02-library-star", "/12-05-modal-custom-address"];

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

interface ILayoutProps {
  children: JSX.Element;
}

export default function Layout(props: ILayoutProps) {
  const router = useRouter();

  const isHiddenHeader = HIDDEN_HEADERS.includes(router.asPath);

  return (
    <LayoutContainer>
      {!isHiddenHeader && <LayoutHeader />}
      <LayoutBanner />
      <LayoutNavigation />
      <div style={{flex: "1", display: "flex"}}>
        <LayoutSidebar />
        {props.children}
      </div>
      <LayoutFooter />
    </LayoutContainer>
  );
}
