# React MMOB Marketplace

- [React MMOB Marketplace](#react-mmob-marketplace)
  - [Requirements](#requirements)
    - [Before you install the MMOB Marketplace](#before-you-install-the-mmob-marketplace)
    - [Content](#content)
  - [1. Set up a CNAME on the domain your main website is operating from](#1-set-up-a-cname-on-the-domain-your-main-website-is-operating-from)
  - [2. Use the React Component to display the marketplace](#2-use-the-react-component-to-display-the-marketplace)
    - [Configuration](#configuration)

## Requirements

### Before you install the MMOB Marketplace

Before you install the MMOB Marketplace, we will create a Customer Partner ID (refered as `cp_id`) to give you access to [MMOB Dashboard production](https://dashboard.mmob.com) and [MMOB Dashboard staging](https://dashboard.staging.mmob.com).

<!-- theme: success -->

> The Customer Partner ID will be used to access both production and staging dashboards.

### Content

To install the MMOB marketplace, the following steps are required:

1. Set up a CNAME on the domain your main website is operating from.
2. Place MMOB JavaScript script in your header.
3. Call the marketplace with your user information.

---

## 1. Set up a CNAME on the domain your main website is operating from

Due to the latest advancements in browser security and tracking prevention, MMOB Marketplace needs to be served under your domain. To do so, you need to add the following configuration to your DNS:

```
marketplace-staging.example.com   CNAME     marketplace-ingress.staging.mmob.com
marketplace.example.com           CNAME     marketplace-ingress.prod.mmob.com
```

---

## 2. Use the React Component to display the marketplace

First, you'll need to install the MMOB react component using NPM:

```
npm i @mmob/react-mmob-marketplace
```

Once installed, add the React Component on your application. The component will take all the space assigned to it and display the marketplace in a secure way.

```ts
/**
 * Note: If you are not passing customer data from your app/website
 *       you can pass an empty object to customerInfo:
 *
 *    eg: const customerInfo = {}
 **/

const Marketplace = () =>
   const customerInfo: MMOBCustomerInfo= {
     email: "sharon.jordan@example.com",
     first_name: "Sharon",
     surname: "Jordan",
     gender: "female",
     title: "Ms",
     building_number: "8",
     address_1: "Brandon Grove",
     town_city: "Newcastle Upon Tyne",
     postcode: "NE2 1PA",
     broadbandProvider: "Virgin Media",
     broadbandPpm: "28",
     broadbandDownSpeed: "110592",
     dob: "1978-12-06T12:27:41.201Z",
   };

   return (
      <MMOBMarketplace
        customerInfo={customerInfo}
        cpId="cp_xxxxx"
        page="broadband"
        locale="en_GB"
        marketplaceUrl="https://marketplace.mmobstars.com"
      />
  )
}
```

### Configuration

| Prop name        | Description                                                                                                                                                                                                                                                                                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `customerInfo`   | All the known information for the customer viewing the marketplace, stored as `Record<string, string>`. <br><br>Valid keys are <br>`"email"` (required)<br> `"first_name"`<br> `"surname"`<br> `"gender"`<br> `"title"`<br> `"building_number"`<br> `"address_1"`<br> `"town_city"`<br> `"postcode"`<br> `"broadbandProvider"`<br> `"broadbandPpm"`<br> `"broadbandDownSpeed"`<br> `"dob"` |
| `cpId`           | Your company MMOB identifier                                                                                                                                                                                                                                                                                                                                                               |
| `page`           | What page of the marketplace should the user see                                                                                                                                                                                                                                                                                                                                           |
| `marketplaceUrl` | The URL where the marketplace will be operated (defined on the CNAME section)                                                                                                                                                                                                                                                                                                              |
| `locale`         | What is the preffered language of the user                                                                                                                                                                                                                                                                                                                                                 |
