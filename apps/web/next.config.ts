import { withIntlayer } from "next-intlayer/server";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  typedRoutes: true
};

export default withIntlayer(withNextIntl(nextConfig));
