import React, { useEffect, useRef } from "react";

const IFRAME_NAME = "mmob_marketplace_target_iframe";

export type MMOBCustomerInfo = {
  email: string;
  first_name?: string;
  surname?: string;
  gender?: "male" | "female";
  title?: string;
  building_number?: string;
  address_1?: string;
  town_city?: string;
  postcode?: string;
  broadbandProvider?: string;
  broadbandPpm?: string;
  broadbandDownSpeed?: string;
  dob?: string;
};
export type MMOBMarketplacePageType =
  | "broadband"
  | "marketplace"
  | "pensionbee"
  | "lending"
  | "energy"
  | "credit_cards"
  | "stocks_shares"
  | "mobile_phones"
  | "mortgages"
  | "uinsure"
  | "cashback";

type MMOBMarketplaceProps = {
  customerInfo: MMOBCustomerInfo | {};
  cpId: string;
  cpDeploymentId: string;
  page: MMOBMarketplacePageType;
  marketplaceUrl: string;
  locale?: string;
};

type MMOBMarketplaceFormProps = MMOBMarketplaceProps;

const MMOBMarketplaceForm = ({
  customerInfo,
  marketplaceUrl,
  cpId,
  cpDeploymentId,
  page,
  locale,
}: MMOBMarketplaceFormProps) => {
  const url = `${marketplaceUrl}/boot`;
  const iframeEl = useRef<HTMLFormElement>(null);
  useEffect(() => {
    iframeEl.current?.submit();
  }, [iframeEl.current]);
  return (
    <form
      method="POST"
      action={url}
      style={{ position: "absolute", top: "-10px", left: "-10px" }}
      target={IFRAME_NAME}
      ref={iframeEl}
    >
      {Object.keys(customerInfo).map((key) => {
        const value = customerInfo[key];
        return <input type="hidden" name={key} value={value} key={key} />;
      })}
      <input type="hidden" name="cp_id" value={cpId} />
      <input type="hidden" name="cp_deployment_id" value={cpDeploymentId} />
      <input type="hidden" name="page" value={page} />
      {locale ? <input type="hidden" name="locale" value={locale} /> : ""}
    </form>
  );
};

const MMOBMarketplace = (props: MMOBMarketplaceProps) => {
  useEffect(() => {
    console.log("Build boot", props);
  }, []);

  const marketplaceUrl =
    props.marketplaceUrl || "https://marketplace.staging.mmob.com";

  const allow = "geolocation 'self' " + marketplaceUrl;
  return (
    <>
      <MMOBMarketplaceForm {...props} marketplaceUrl={marketplaceUrl} />
      <iframe
        name={IFRAME_NAME}
        style={{ width: "100%", height: "100%", border: 0 }}
        allow={allow}
      />
    </>
  );
};

export default MMOBMarketplace;
