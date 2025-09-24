import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['placeholder.svg'],
    unoptimized: true,
  },
  webpack: (config) => {
   config.ignoreWarnings = [
      {
        // Ignore all warnings/errors for Radix UI missing modules
        message: /Can't resolve '@radix-ui\/react-.+'/,
      },
    ]
    return config
  },
}

export default withNextIntl(nextConfig)
