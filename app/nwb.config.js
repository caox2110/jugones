module.exports = {
  type: 'react-app',
  webpack: {
    define: {
      'process.env.API_BASE_URL': JSON.stringify('http://localhost:3001'),
      'process.env.REQUEST_CONTENT_TYPE': JSON.stringify('application/json')
    },
    config(config) {
      // Change config as you wish
      const isDevelop = config.mode === 'development'
      const rules = config.module.rules;
      const index = rules.findIndex(p => `${p.test}` === `${/\.css$/}`);
      const cssLoader = rules[index];

      // deep object copy and update necesary entries
      const moduleCssLoader = {
        ...cssLoader,
        test: /\.module.css$/,
        use: [...cssLoader.use]
      };
      moduleCssLoader.use[1] = {
        ...cssLoader.use[1],
        options: {
          ...cssLoader.use[1].options,
          modules: {
            auto: true,
          },
          localIdentName: isDevelop ? '[path][name]__[local]--[hash:base64:5]' : null
        }
      };

      cssLoader.exclude = /\.module\.css$/;
      config.module.rules.push(moduleCssLoader);

      // You MUST return the edited config object
      return config
    }
  }
}
