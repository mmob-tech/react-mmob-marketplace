import React, { useEffect, useRef } from 'react';

const IFRAME_NAME = 'mmob_marketplace_target_iframe';

type MMOBCustomerInfo = Record<string, string>;
type MMOBMarketplaceProps = {
  customerInfo: MMOBCustomerInfo;
  cpId: string;
  page: 'broadband' | 'marketplace';
  marketplaceUrl: string;
};

type MMOBMarketplaceFormProps = MMOBMarketplaceProps;

const keys = [
  'email',
  'first_name',
  'surname',
  'gender',
  'title',
  'building_number',
  'address_1',
  'town_city',
  'postcode',
  'broadbandProvider',
  'broadbandPpm',
  'broadbandDownSpeed',
  'dob',
];

const MMOBMarketplaceForm = ({
  customerInfo,
  marketplaceUrl,
  cpId,
  page,
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
      style={{ position: 'absolute', top: '-10px', left: '-10px' }}
      target={IFRAME_NAME}
      ref={iframeEl}
    >
      {keys.map((key) => {
        const value = customerInfo[key];
        return <input type="hidden" name={key} value={value} key={key} />;
      })}
      <input type="hidden" name="cp_id" value={cpId} />
      <input type="hidden" name="page" value={page} />
    </form>
  );
};

const MMOBMarketplace = (props: MMOBMarketplaceProps) => {
  useEffect(() => {
    console.log('Build boot', props);
  }, []);

  const marketplaceUrl = props.marketplaceUrl || 'https://marketplace.staging.mmob.com';

  const allow = "geolocation 'self' " + marketplaceUrl;
  return (
    <>
      <MMOBMarketplaceForm {...props} marketplaceUrl={marketplaceUrl} />
      <iframe
        name={IFRAME_NAME}
        style={{ width: '100%', height: '100%', border: 0 }}
        allow={allow}
      />
    </>
  );
};

export default MMOBMarketplace;
