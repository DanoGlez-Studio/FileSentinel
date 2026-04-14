import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  typedRoutes: true
};

export default withNextIntl(nextConfig);
