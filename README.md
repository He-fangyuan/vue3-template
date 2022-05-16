# Vue3模板

## 使用 vite 快速创建脚手架

> 兼容性注意:Vite 需要 `Node.js` 版本 `>= 12.0.0`。

1. 第一步: 在需要创建项目文件目录下打开 `cmd` 运行以下命令

```bash
# npm
npm init vite

# yarn
yarn create vite
```

这里我采用 `yarn` 来安装

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c4d3de6d98f643f2b7e2a4937a22f0c6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

1. 第二步: 选择 `vue`回车 => `vue-ts`回车

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c16b23c70309483c9cae51d0f096425a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp) ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/acd58631a0494185871a488558f60e75~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

1. 第三步: `cd` 到项目文件夹,安装依赖,启动项目

```bash
# 进入项目文件夹
cd vite_vue3_ts

# 安装依赖
yarn
# 启动
yarn dev

# 安装依赖
pnpm install
# 启动
pnpm dev
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/704ced7929da4c56b29633f188d780e2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

## vite基础配置

### 初始文件

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]
})
```

### 路径配置

```
pnpm install @types/node --save-dev
```

```js
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',   // 在生产中服务时的基本公共路径。 
  resolve: {
    alias: {
        "@": resolve(__dirname, './src'), // 这里是将src目录配置别名为 @ 方便在项目中导入src目录下的文件
    }
},
})
```

### 打包配置

```js
// 打包配置
build: {
    target: 'modules', // 设置最终构建的浏览器兼容目标。modules:支持原生 ES 模块的浏览器
    outDir: 'dist', // 指定输出路径
    assetsDir: 'assets', // 指定生成静态资源的存放路径
    sourcemap: false, // 构建后是否生成 source map 文件
    minify: 'terser', // 混淆器，terser构建后文件体积更小
    terserOptions: {   
        compress: { 
            drop_console: true,
            drop_debugger: true, 
        },
    },   //去除 console debugger
},
```

### 本地运行及反向代理配置

```js
 // 本地运行配置，及反向代理配置
server: {
    host: 'localhost', // 指定服务器主机名
    port: 3000, // 指定服务器端口
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    strictPort: false, // 设为 false 时，若端口已被占用则会尝试下一个可用端口,而不是直接退出
    https: false, // 是否开启 https
    cors: true, // 为开发服务器配置 CORS。默认启用并允许任何源
    proxy: { // 为开发服务器配置自定义代理规则
        // 字符串简写写法 
        '/foo': 'http://192.168.xxx.xxx:xxxx', 
        // 选项写法
        '/api': {
            target: 'http://192.168.xxx.xxx:xxxx', //代理接口
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
        }
    }
}
```

## 配置环境变量env

### 在项目根目录新建 .env.development、.env.production、.env.test

```javascript
//开发.env.development
VITE_MODE_NAME=development
VITE_APP_ID=123456
VITE_AGENT_ID=123456
VITE_LOGIN_TEST=true
VITE_RES_URL=https://www.baidu.com
VITE_APP_TITLE=风控管理平台
VITE_EDITOR=webstorm
//生产.env.production
VITE_MODE_NAME=production
VITE_APP_ID=123456
VITE_AGENT_ID=123456
VITE_LOGIN_TEST=false
VITE_RES_URL=https://www.baidu.com
VITE_APP_TITLE=风控管理平台
VITE_EDITOR=webstorm
//测试环境.env.test
VITE_MODE_NAME=test
VITE_APP_ID=123456
VITE_AGENT_ID=123456
VITE_LOGIN_TEST=true
VITE_RES_URL=https://www.baidu.com
VITE_APP_TITLE=风控管理平台
VITE_EDITOR=webstorm
```

### 创建代码提示 env.d.ts

```javascript
// src/types/env.d.ts
interface ImportMetaEnv {
  VITE_MODE_NAME: string,
  VITE_APP_ID: string,
  VITE_AGENT_ID: string,
  VITE_LOGIN_TEST: string,
  VITE_RES_URL: string,
  VITE_APP_TITLE: string
}
```

### 组件中使用

```javascript
import.meta.VITE_MODE_NAME
import.meta.VITE_APP_ID
import.meta.VITE_AGENT_ID
import.meta.VITE_LOGIN_TEST
import.meta.VITE_RES_URL
import.meta.VITE_APP_TITLE
```

### vite.config.ts中使用

```javascript
import { defineConfig, loadEnv } from 'vite'
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname)
  return {
	plugins[],
	base: env.VITE_RES_URL
  }
})
```

### package.json中配置打包命令

```javascript
"scripts": {
    "dev": "vite --host",
    "build": "vue-tsc --noEmit && vite build",
    "test": "vite build --mode test",
    "serve": "vite preview",
    "use:npm": "nrm use npm",
    "use:taobao": "nrm use taobao",
    "update:des": "cnpm i",
    "update": "ncu -u && cnpm i",
    "update:globle": "ncu -g"
  },
```

## 配置eslint&prettier

### 安装 eslint 依赖

```sh
# eslint 安装
yarn add eslint --dev
# eslint 插件安装
yarn add eslint-plugin-vue --dev

yarn add @typescript-eslint/eslint-plugin --dev

yarn add eslint-plugin-prettier --dev

# typescript parser
yarn add @typescript-eslint/parser --dev
```

注意: 如果 `eslint` 安装报错:

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/799c7eee7a66421294a69676b24b1010~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

可以尝试运行以下命令:

```bash
yarn config set ignore-engines true
```

运行成功后再次执行 `eslint` 安装命令

### eslint 相关配置说明

#### 环境配置 env

#### **一个环境定义了一组预定义的全局变量。可用的环境包括**

- 一个环境定义了一组预定义的全局变量。可用的环境包括
- `browser` - 浏览器环境中的全局变量。
- `node` - Node.js 全局变量和 Node.js 作用域。
- `commonjs` - CommonJS 全局变量和 CommonJS 作用域 (用于 Browserify/WebPack 打包的只在浏览器中运行的代码)。
- `shared-node-browser` - Node.js 和 Browser 通用全局变量。
- `es6` - 启用除了 modules 以外的所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）。
- `worker` - Web Workers 全局变量。
- `amd` - 将 require() 和 define() 定义为像 amd 一样的全局变量。
- `mocha` - 添加所有的 Mocha 测试全局变量。
- `jasmine` - 添加所有的 Jasmine 版本 1.3 和 2.0 的测试全局变量。
- `jest` - Jest 全局变量。
- `phantomjs` - PhantomJS 全局变量。
- `protractor` - Protractor 全局变量。
- `qunit` - QUnit 全局变量。
- `jquery` - jQuery 全局变量。
- `prototypejs` - Prototype.js 全局变量。
- `shelljs` - ShellJS 全局变量。
- `meteor` - Meteor 全局变量。
- `mongo` - MongoDB 全局变量。
- `applescript` - AppleScript 全局变量。
- `nashorn` - Java 8 Nashorn 全局变量。

#### [插件相关 plugins](https://link.juejin.cn/?target=https%3A%2F%2Fcn.eslint.org%2Fdocs%2Fuser-guide%2Fconfiguring%23configuring-plugins)

- `ESLint` 支持使用第三方插件。在使用插件之前，你必须使用 `npm` 安装它。
- 在配置文件里配置插件时，可以使用 plugins 关键字来存放插件名字的列表。插件名称可以省略 `eslint-plugin-` 前缀
- `ESLint` 将加载与用户通过从项目 Node 交互解释器运行 (`'eslint-plugin-pluginname'`) 获得的相同的插件

#### [规则配置 rules](https://link.juejin.cn/?target=https%3A%2F%2Fcn.eslint.org%2Fdocs%2Fuser-guide%2Fconfiguring%23using-configuration-files)

- 配置定义在插件中的一个规则的时候，你必须使用 插件名/规则ID 的形式
- `"rules": {"plugin1/rule1": "error"}`
- 规则 `plugin1/rule1` 表示来自插件 `plugin1` 的 `rule1` 规则
- 当指定来自插件的规则时，确保删除 `eslint-plugin-` 前缀。`ESLint` 在内部只使用没有前缀的名称去定位规则

#### [异常等级配置](https://link.juejin.cn/?target=https%3A%2F%2Fcn.eslint.org%2Fdocs%2Fuser-guide%2Fconfiguring%23configuring-rules)

- "`off`" 或 0 - 关闭规则
- "`warn`" 或 1 - 开启规则，使用警告级别的错误：`warn` (不会导致程序退出)
- "`error`" 或 2 - 开启规则，使用错误级别的错误：`error` (当被触发的时候，程序会退出)

#### [extend 规则继承](https://link.juejin.cn/?target=https%3A%2F%2Fcn.eslint.org%2Fdocs%2Fuser-guide%2Fconfiguring%23using-the-configuration-from-a-plugin)

- `plugins` 属性值 可以省略包名的前缀 `eslint-plugin-`。
- `extends` 属性值可以由以下组成：
- · `plugin:`
- · 包名 (省略了前缀，比如，react)
- · /
- · 配置名称 (比如 `recommended`)

### .eslintrc.js 配置规则文件

```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parser: 'vue-eslint-parser',
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    // eslint-config-prettier 的缩写
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  // eslint-plugin-vue @typescript-eslint/eslint-plugin eslint-plugin-prettier的缩写
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-var': 'error',
    'prettier/prettier': 'error',
    // 禁止出现console
    'no-console': 'warn',
    // 禁用debugger
    'no-debugger': 'warn',
    // 禁止出现重复的 case 标签
    'no-duplicate-case': 'warn',
    // 禁止出现空语句块
    'no-empty': 'warn',
    // 禁止不必要的括号
    'no-extra-parens': 'off',
    // 禁止对 function 声明重新赋值
    'no-func-assign': 'warn',
    // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
    'no-unreachable': 'warn',
    // 强制所有控制语句使用一致的括号风格
    curly: 'warn',
    // 要求 switch 语句中有 default 分支
    'default-case': 'warn',
    // 强制尽可能地使用点号
    'dot-notation': 'warn',
    // 要求使用 === 和 !==
    eqeqeq: 'warn',
    // 禁止 if 语句中 return 语句之后有 else 块
    'no-else-return': 'warn',
    // 禁止出现空函数
    'no-empty-function': 'warn',
    // 禁用不必要的嵌套块
    'no-lone-blocks': 'warn',
    // 禁止使用多个空格
    'no-multi-spaces': 'warn',
    // 禁止多次声明同一变量
    'no-redeclare': 'warn',
    // 禁止在 return 语句中使用赋值语句
    'no-return-assign': 'warn',
    // 禁用不必要的 return await
    'no-return-await': 'warn',
    // 禁止自我赋值
    'no-self-assign': 'warn',
    // 禁止自身比较
    'no-self-compare': 'warn',
    // 禁止不必要的 catch 子句
    'no-useless-catch': 'warn',
    // 禁止多余的 return 语句
    'no-useless-return': 'warn',
    // 禁止变量声明与外层作用域的变量同名
    'no-shadow': 'off',
    // 允许delete变量
    'no-delete-var': 'off',
    // 强制数组方括号中使用一致的空格
    'array-bracket-spacing': 'warn',
    // 强制在代码块中使用一致的大括号风格
    'brace-style': 'warn',
    // 强制使用骆驼拼写法命名约定
    camelcase: 'warn',
    // 强制使用一致的缩进
    indent: 'off',
    // 强制在 JSX 属性中一致地使用双引号或单引号
    // 'jsx-quotes': 'warn',
    // 强制可嵌套的块的最大深度4
    'max-depth': 'warn',
    // 强制最大行数 300
    // "max-lines": ["warn", { "max": 1200 }],
    // 强制函数最大代码行数 50
    // 'max-lines-per-function': ['warn', { max: 70 }],
    // 强制函数块最多允许的的语句数量20
    'max-statements': ['warn', 100],
    // 强制回调函数最大嵌套深度
    'max-nested-callbacks': ['warn', 3],
    // 强制函数定义中最多允许的参数数量
    'max-params': ['warn', 3],
    // 强制每一行中所允许的最大语句数量
    'max-statements-per-line': ['warn', { max: 1 }],
    // 要求方法链中每个调用都有一个换行符
    'newline-per-chained-call': ['warn', { ignoreChainWithDepth: 3 }],
    // 禁止 if 作为唯一的语句出现在 else 语句中
    'no-lonely-if': 'warn',
    // 禁止空格和 tab 的混合缩进
    'no-mixed-spaces-and-tabs': 'warn',
    // 禁止出现多行空行
    'no-multiple-empty-lines': 'warn',
    // 禁止出现;
    semi: ['warn', 'never'],
    // 强制在块之前使用一致的空格
    'space-before-blocks': 'warn',
    // 强制在 function的左括号之前使用一致的空格
    // 'space-before-function-paren': ['warn', 'never'],
    // 强制在圆括号内使用一致的空格
    'space-in-parens': 'warn',
    // 要求操作符周围有空格
    'space-infix-ops': 'warn',
    // 强制在一元操作符前后使用一致的空格
    'space-unary-ops': 'warn',
    // 强制在注释中 // 或 /* 使用一致的空格
    // "spaced-comment": "warn",
    // 强制在 switch 的冒号左右有空格
    'switch-colon-spacing': 'warn',
    // 强制箭头函数的箭头前后使用一致的空格
    'arrow-spacing': 'warn',
    'no-var': 'warn',
    'prefer-const': 'warn',
    'prefer-rest-params': 'warn',
    'no-useless-escape': 'warn',
    'no-irregular-whitespace': 'warn',
    'no-prototype-builtins': 'warn',
    'no-fallthrough': 'warn',
    'no-extra-boolean-cast': 'warn',
    'no-case-declarations': 'warn',
    'no-async-promise-executor': 'warn',
      //关闭组件命名规则
     "vue/multi-word-component-names":"off",
      endOfLine: 'auto', //避免报错delete (cr)的错
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
}
```

### .eslintignore 配置 eslint 忽略文件

```
*.sh
node_modules
*.md
*.woff
*.ttf
.vscode
.idea
dist
/public
/docs
.husky
.local
/bin
.eslintrc.js
prettier.config.js
/src/mock/*
```

### 安装 prettier 依赖

```sh
npm i prettier eslint-config-prettier -D
```

### .prettierrc.js 配置规则文件

```javascript
module.exports = {
    // 一行最多 100 字符
    printWidth: 100,
    // 使用 4 个空格缩进
    tabWidth: 4,
    // 不使用缩进符，而使用空格
    useTabs: false,
    // 行尾不需要有分号
    semi: false,
    // 使用单引号
    singleQuote: true,
    // 对象的 key 仅在必要时用引号
    quoteProps: 'as-needed',
    // jsx 不使用单引号，而使用双引号
    jsxSingleQuote: false,
    // 尾随逗号
    trailingComma: 'all',
    // 大括号内的首尾需要空格
    bracketSpacing: true,
    // jsx 标签的反尖括号需要换行
    jsxBracketSameLine: false,
    // 箭头函数，只有一个参数的时候，也需要括号
    arrowParens: 'always',
    // 每个文件格式化的范围是文件的全部内容
    rangeStart: 0,
    rangeEnd: Infinity,
    // 不需要写文件开头的 @prettier
    requirePragma: false,
    // 不需要自动在文件开头插入 @prettier
    insertPragma: false,
    // 使用默认的折行标准
    proseWrap: 'preserve',
    // 根据显示样式决定 html 要不要折行
    htmlWhitespaceSensitivity: 'css',
    // 换行符使用 lf
    endOfLine: 'lf',
}
```

### .prettierignore 配置 prettier 忽略文件

```
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*
```

###  package.json 配置:

```json
{
  "script": {
    "lint": "eslint src --fix --ext .ts,.tsx,.vue,.js,.jsx",
    "prettier": "prettier --write ."
  }
}
```

上面配置完成后,可以运行以下`命令`测试下代码检查个`格式化`效果:

```bash
# eslint 检查
yarn lint
# prettier 自动格式化
yarn prettier
```

## 配置 css 预处理器 scss

在 `src/assets` 下新增 `style` 文件夹，用于存放全局样式文件

新建 `main.scss`, 设置一个用于测试的颜色`变量` :

```scss
$test-color: red;
```

###  Vite配置

如何将这个全局样式文件`全局注入`到项目中呢？配置 `Vite` 即可：

```js
css:{
    preprocessorOptions:{
      scss:{
        additionalData:'@import "@/assets/style/mian.scss";'
      }
    }
  },
```

### 组件中使用

> 不需要任何引入可以直接使用全局`scss`定义的变量

```scss
.test{
  color: $test-color;
}
```

## 使用组件库 Naive UI

> 组件库选择，这里我们选择 `Naive UI` 至于为什么选择它？我可以直接说`尤大大`推荐的吗？

- 官方介绍：
  - 一个 `Vue 3` 组件库
  - 比较完整，`主题可调`，使用 `TypeScript`，不算太慢
  - 有点意思

介绍还是比较谦虚的，既然`尤大`推荐，肯定有它的优势了!!!

### 安装 Naive UI

```bash
# 安装 组件库
yarn add naive-ui
# 安装 字体
yarn add vfonts
```

### 如何使用

```js
import { NButton } from "naive-ui"
<n-button>naive-ui</n-button>
```

### 全局配置 Config Provider

> 全局化配置设置内部组件的`主题`、`语言`和组件卸载于其他位置的 `DOM` 的类名。

```html
<n-config-provider :locale="zhCN" :theme="theme">
    <!-- 容器 -->
</n-config-provider>
```

尤其是主题配置这个功能，我真的很喜欢 ❤️

> 组件库选择上不做任何强制，根据自己的项目需要选择合适的组件库即可

### messge弹窗设置

#### 1，增加一个组件 message-[api](https://so.csdn.net/so/search?q=api&spm=1001.2101.3001.7020).vue

```html
<template>
  <div></div>
</template>
 
<script>
import { defineComponent, getCurrentInstance } from "vue";
import { useMessage } from "naive-ui";
 
export default defineComponent({
  setup() {
    window.$message = useMessage();
  },
});
</script>
```

### 2，在App.vue中增加如下配置

```html
<template>
  <n-message-provider>
    <MessageApi />
  </n-message-provider>
  <router-view />
</template>
 
<script>
import MessageApi from "@/components/message-api.vue";
import { NMessageProvider } from "naive-ui";
 
export default {
  components: { MessageApi, NMessageProvider },
  name: "App",
  setup(props) {},
};
</script>
 
<style>
* {
  margin: 0;
  padding: 0;
}
</style>
```

### 3.任意组件内使用方式：

```javascript
window.$message.success("success message");
window.$message.error('error message')
window.$message.warning('warning messsage')
```

## 按需导入配置

### 组件按需导入  unplugin-vue-components 

#### 安装

```sh
npm install -D unplugin-vue-components
```

#### Vite配置

```js
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default {
  plugins: [
    // ...
    Components({
      resolvers: [NaiveUiResolver()],
      // 指定组件位置，默认是src/components
      dirs: ['src/components'],
      // ui库解析器
      // resolvers: [ElementPlusResolver()],
      extensions: ['vue'],
      // 配置文件生成位置
      dts: 'src/components.d.ts'
    }),
  ],
}
```

#### Webpack配置

```js
// webpack.config.js
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { NaiveUiResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  // ...
  plugins: [
    AutoImport({
      resolvers: [NaiveUiResolver()],
    }),
    Components({
      resolvers: [NaiveUiResolver()],
       // 指定组件位置，默认是src/components
      dirs: ['src/components'],
      // ui库解析器
      // resolvers: [ElementPlusResolver()],
      extensions: ['vue'],
      // 配置文件生成位置
      dts: 'src/components.d.ts'
    }),
  ],
}
```

插件会生成一个ui库组件以及指令路径components.d.ts和auto-imports.d.ts文件

```js
// components.d.ts

// generated by unplugin-vue-components
// We suggest you to commit this file into source control
// Read more: https://github.com/vuejs/vue-next/pull/3399

declare module 'vue' {
  export interface GlobalComponents {
    BaseFilter: typeof import('./components/Common/BaseFilter.vue')['default']
    BaseHeader: typeof import('./components/Common/BaseHeader.vue')['default']
    BasePagination: typeof import('./components/Common/BasePagination.vue')['default']
    BaseSidebar: typeof import('./components/Common/BaseSidebar.vue')['default']
    BaseTags: typeof import('./components/Common/BaseTags.vue')['default']
    BaseTitle: typeof import('./components/Common/BaseTitle.vue')['default']
  }
}

export { }

// 插件的所有默认配置
Components({
  // relative paths to the directory to search for components.
  // 要搜索组件的目录的相对路径
  dirs: ['src/components'],
  
  // valid file extensions for components.
  // 组件的有效文件扩展名。
  extensions: ['vue'],
  
  // search for subdirectories
  // 搜索子目录
  deep: true,
  
  // resolvers for custom components
  // 自定义组件的解析器
  resolvers: [],

  // generate `components.d.ts` global declarations, 
  // also accepts a path for custom filename
  // 生成 `components.d.ts` 全局声明，
  // 也接受自定义文件名的路径
  dts: false,

  // Allow subdirectories as namespace prefix for components.
  // 允许子目录作为组件的命名空间前缀。
  directoryAsNamespace: false,
  
  // 忽略命名空间前缀的子目录路径
  // 当`directoryAsNamespace: true` 时有效
  // Subdirectory paths for ignoring namespace prefixes
  // works when `directoryAsNamespace: true`
  globalNamespaces: [],

  // auto import for directives
  // default: `true` for Vue 3, `false` for Vue 2
  // Babel is needed to do the transformation for Vue 2, it's disabled by default for performance concerns.
  // To install Babel, run: `npm install -D @babel/parser @babel/traverse`
  // 自动导入指令
  // 默认值：Vue 3 的`true`，Vue 2 的`false`
  // 需要 Babel 来为 Vue 2 进行转换，出于性能考虑，它默认处于禁用状态。
  directives: true,

  // filters for transforming targets
  include: [/.vue$/, /.vue?vue/],
  exclude: [/[\/]node_modules[\/]/, /[\/].git[\/]/, /[\/].nuxt[\/]/],
})
```

其他组件库同理配置

```js
// webpack.config.js
const components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver,AntDesignVueResolver,VantResolver,HeadlessUiResolver,ElementUiResolver } = require('unplugin-vue-components/resolvers')

module.exports =
  plugins: [
    Components({
      resolvers: [
         AntDesignVueResolver(),
         ElementPlusResolver(),
         VantResolver(),
         HeadlessUiResolver(),
         ElementUiResolver()
      ]
    })
  ]
}
```

### [unplugin-auto-import/vite](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fantfu%2Funplugin-auto-import)

自动导入vue3的hooks，借助[unplugin-auto-import/vite](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fantfu%2Funplugin-auto-import)这个插件

**支持`vue`, `vue-router`, `vue-i18n`, `@vueuse/head`, `@vueuse/core`等自动引入**

先看效果图

```js
// 引入前
import { ref, computed } from 'vue'
const count = ref(0)
const doubled = computed(() => count.value * 2)

//引入后
const count = ref(0)
const doubled = computed(() => count.value * 2)


// 引入前
import { useState } from 'react'
export function Counter() {
  const [count, setCount] = useState(0)
  return <div>{ count }</div>
}

//引入后
export function Counter() {
  const [count, setCount] = useState(0)
  return <div>{ count }</div>
}
```

安装

```js
npm i -D unplugin-auto-import
```

#### Vite配置

```js
// vite.config.js
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    AutoImport({
        imports: ['vue'],
      //imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/head', '@vueuse/core'],
      // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
      // dts: 'src/auto-import.d.ts'
    })
  ]
})
```

`原理:` 安装的时候会自动生成auto-imports.d文件(默认是在根目录)

```js
// Generated by 'unplugin-auto-import'
// We suggest you to commit this file into source control
declare global {
  const ref: typeof import('vue')['ref']
  const reactive: typeof import('vue')['reactive']
  const computed: typeof import('vue')['computed']
  const createApp: typeof import('vue')['createApp']
  const watch: typeof import('vue')['watch']
  const customRef: typeof import('vue')['customRef']
  const defineAsyncComponent: typeof import('vue')['defineAsyncComponent']
  .
  .
  .
}
export {}
```

**可以选择auto-import.d.ts生成的位置，使用ts建议设置为src/auto-import.d.ts**

其他插件 `vue-router`, `vue-i18n`, `@vueuse/head`, `@vueuse/core`等自动引入的自动引入请查看文档

```js
// 插件的所有默认配置
AutoImport({
  // targets to transform
  include: [
    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
    /\.vue$/, /\.vue\?vue/, // .vue
    /\.md$/, // .md  
  ],

  // global imports to register
  imports: [
    // presets
    'vue',
    'vue-router',
    // custom
    {
      '@vueuse/core': [
        // named imports
        'useMouse', // import { useMouse } from '@vueuse/core',
        // alias
        ['useFetch', 'useMyFetch'] // import { useFetch as useMyFetch } from '@vueuse/core',
      ],
      'axios': [
        // default imports
        ['default', 'axios'] // import { default as axios } from 'axios',
      ],
      '[package-name]': [
        '[import-names]',
        // alias
        ['[from]', '[alias]']
      ]
    }
  ],

  // custom resolvers
  // 可以在这自定义自己的东西，比如接口api的引入，工具函数等等
  // see https://github.com/antfu/unplugin-auto-import/pull/23/
  resolvers: [
    /* ... */
  ]
})
```

### [vue-global-api](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fantfu%2Fvue-global-api) 解决eslint报错

**在页面没有引入的情况下，使用unplugin-auto-import/vite来自动引入hooks，在项目中肯定会报错的，这时候需要在eslintrc.js中的extends引入vue-global-api，这个插件是vue3hooks的,其他自己找找，找不到的话可以手动配置一下globals**

安装 [vue-global-api](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fantfu%2Fvue-global-api)

```js
npm install vue-global-api -D
复制代码
// .eslintrc.js
module.exports = {
  extends: [
    'vue-global-api'
  ]
};
```

它还为细粒度控制提供了相同的集合和单个 API 选项。

```js
// .eslintrc.js
module.exports = {
  extends: [
    // collections
    'vue-global-api/reactivity',
    'vue-global-api/lifecycle',
    'vue-global-api/component',
    // single apis
    'vue-global-api/ref',
    'vue-global-api/toRef',
  ]
};
```

### === [vite-plugin-style-import](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fanncwb%2Fvite-plugin-style-import)

当你使用unplugin-vue-components来引入ui库的时候

message, notification 等引入样式不生效 安装vite-plugin-style-import即可

```
npm install vite-plugin-style-import -D
```

**这里以一些流行库为例**

```js
// vite.config.js
import { defineConfig } from 'vite'
import styleImport, {
  AndDesignVueResolve,
  VantResolve,
  ElementPlusResolve,
  NutuiResolve,
  AntdResolve
} from 'vite-plugin-style-import'

export default defineConfig({
  plugins: [
    styleImport({
      resolves: [
        AndDesignVueResolve(),
        VantResolve(),
        ElementPlusResolve(),
        NutuiResolve(),
        AntdResolve()
      ],
      // 自定义规则
      libs: [
        {
          libraryName: 'ant-design-vue',
          esModule: true,
          resolveStyle: (name) => {
            return `ant-design-vue/es/${name}/style/index`
          }
        }
      ]
    })
  ],
  // 引用使用less的库要配置一下
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
})
```

### `注意点`

####  element-plus默认是[英文](https://link.juejin.cn/?target=https%3A%2F%2Felement-plus.org%2Fzh-CN%2Fguide%2Fi18n.html%23configprovider)

**方案: 在app.vue加上ElConfigProvider**

```vue
<template>
  <div id="app">
    <el-config-provider :locale="locale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>
<script setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
const locale = zhCn
</script>
```

#### **日期相关组件设置中文:**

```vue
<script setup>
// 日历等与dayjs相关的组件，不想显示中文可以不加
// 第一种方法 使用中国时区weekStart默认为1
import 'dayjs/locale/zh-cn'

// 第二种方法 使用 weekStart可配置(只能是0或者1)
import dayjs from 'dayjs'
// 引入英文即为英文
import cn from 'dayjs/locale/zh-cn'
dayjs.locale({
  ...cn,
  weekStart: 1
})


const locale = zhCn
</script>
```

## SVG配置

#### 通过 `vite-plugin-svg-icons` 插件封装SvgIcon组件

```js
通过命令安装插件

yarn add vite-plugin-svg-icons -D
# or
npm i vite-plugin-svg-icons -D
# or
pnpm install vite-plugin-svg-icons -D
```

#### 配置 `vite.config.ts`

```js
//插件引入
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

  plugins: [
    vue(),
    Components({
      // UI库
      resolvers: [ArcoResolver()],
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",

      /**
       * 自定义插入位置
       * @default: body-last
       */
      // inject?: 'body-last' | 'body-first'

      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      // customDomId: '__svg__icons__dom__',
    }),
  ],
```

#### 配置 `main.ts`

```js
import 'virtual:svg-icons-register'
```

#### 封装SvgIcon组件 `src/components/SvgIcon`

```vue
<template>
  <svg aria-hidden="true">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    prefix: {
      type: String,
      default: 'icon',
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#333',
    },
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`)
    return { symbolId }
  },
})
</script>
```

#### 全局注册 `main.ts`

```js
import { createApp } from "vue";
import App from "./App.vue";
// 路由 router 4.0
import router from "./router/router";
// 状态管理器  Pinia
import { createPinia } from "pinia";
const pinia = createPinia();
// UI库 ardo.design
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
// svg封装插件
import SvgIcon from "@/components/SvgIcon.vue"; +++
import "virtual:svg-icons-register";            +++      
createApp(App)
  .use(router)
  .use(pinia)
  .component("svg-icon", SvgIcon)               +++  
  .use(ArcoVue, {
    componentPrefix: "arco",
  })
  .mount("#app");
```

#### 组件使用 `index.vue`

```html
// 只需name绑定成icons目录下的svg文件名即可
<SvgIcon name="music" style="height: 15px" />
```

## 路由配置

### 安装

```sh
yarn add vue-router
```

### 配置路由信息

```ts
/*@/router/index.ts*/
import { createRouter,createWebHashHistory,RouteRecordRaw } from "vue-router"

// 定义路由
const routes: Array<RouteRecordRaw> = [{
    path: '/',
    name: 'Home',
    component: () => import('@/components/Home.vue'),
    meta: {
        title:'首页'
    }
    },{
    path: '/login',
    name: '登录页面',
    component: () => import('@/components/Login.vue'),
    meta: {
        title:'Login'
    }
    }]

//创建路由实例，把定义的路由挂载到路由实例中
export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
```

### 配置main.ts

```ts
import { createApp } from 'vue'
import App from './App.vue'

import {router} from './router/index'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

### 页面应用

#### 路由跳转

```ts
import {useRouter} from 'vue-router'

const router = useRouter()
const routerPush = ()=>{
    router.push('/login')
}
```

#### 获取路由信息

```ts
import {useRoute} from 'vue-router'

const router = useRoute()
console.log(router.name);

window.document.title = router.meta.title
```

## Axios配置

### 一、引入axios库

```shell
yarn add axios
# 安装 nprogress 用于请求 loading
# 也可以根据项目需求自定义其它 loading
yarn add nprogress
# 类型声明，或者添加一个包含 `declare module 'nprogress'
yarn add @types/nprogress --dev
```

### 二、新建文件

目录结构

`src`目录下新建`api`文件，

- `api.ts` 进行接口API的统一管理
- `http.ts` 封装请求配置拦截器
- `status.ts` 管理接口返回状态码

### 三、axios.ts

代码内逐行解释

```ts
//http.ts
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import NProgress from 'nprogress'
import { showMessage } from "./status";   // 引入状态码文件


// 设置请求头和请求路径
axios.defaults.baseURL = '/api'
axios.defaults.timeout = import.meta.env.VITE_API_DOMAIN;  
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

axios.interceptors.request.use(
  (config): AxiosRequestConfig<any> => {
    const token = window.localStorage.getItem('token')
    if (token) {
      //@ts-ignore
      config.headers.token = token
    }
    return config
  },
  (error) => {
    return error
  }
)
// 响应拦截
axios.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.data && res.data.token) {
      localStorage.setItem('token', res.data.token)
      // token过期操作
    }
    if (res.status === 200) {
      return res;
    } else {
      window.$message.error(showMessage(response.status));
      return res;
    }
    return res
  },
  // 请求失败
  (error: any) => {
    const {response} = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      window.$message.error(showMessage(response.status));
      return Promise.reject(response.data);
    } else {
      window.$message.warning('网络连接异常,请稍后再试!');
    }
  }
)

interface ResType<T> {
  code: number
  data?: T
  msg: string
  err?: string
}
interface Http {
  get<T>(url: string, params?: unknown): Promise<ResType<T>>
  post<T>(url: string, params?: unknown): Promise<ResType<T>>
  upload<T>(url: string, params: unknown): Promise<ResType<T>>
  download(url: string): void
}

const http: Http = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start()
      axios
        .get(url, { params })
        .then((res) => {
          NProgress.done()
          resolve(res.data)
        })
        .catch((err) => {
          NProgress.done()
          reject(err.data)
        })
    })
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start()
      axios
        .post(url, JSON.stringify(params))
        .then((res) => {
          NProgress.done()
          resolve(res.data)
        })
        .catch((err) => {
          NProgress.done()
          reject(err.data)
        })
    })
  },
  upload(url, file) {
    return new Promise((resolve, reject) => {
      NProgress.start()
      axios
        .post(url, file, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          NProgress.done()
          resolve(res.data)
        })
        .catch((err) => {
          NProgress.done()
          reject(err.data)
        })
    })
  },
  download(url) {
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = url
    iframe.onload = function () {
      document.body.removeChild(iframe)
    }
    document.body.appendChild(iframe)
  },
}
export default http
```

### 四、status.ts

不解释了，粘走直接用

```ts
export const showMessage = (status:number|string) : string => {
    let message:string = "";
    switch (status) {
        case 400:
            message = "请求错误(400)";
            break;
        case 401:
            message = "未授权，请重新登录(401)";
            break;
        case 403:
            message = "拒绝访问(403)";
            break;
        case 404:
            message = "请求出错(404)";
            break;
        case 408:
            message = "请求超时(408)";
            break;
        case 500:
            message = "服务器错误(500)";
            break;
        case 501:
            message = "服务未实现(501)";
            break;
        case 502:
            message = "网络错误(502)";
            break;
        case 503:
            message = "服务不可用(503)";
            break;
        case 504:
            message = "网络超时(504)";
            break;
        case 505:
            message = "HTTP版本不受支持(505)";
            break;
        default:
            message = `连接出错(${status})!`;
    }
    return `${message}，请检查网络或联系管理员！`;
};
```

### 五、api.ts

引入`http`,按功能模块进行接口的管理

```ts
import http from './http'

/**
 * @description -封装User类型的接口方法
 */
export class UserService {       // 模块一
    /**
     * @description 用户登录
     * @param {string} username - 用户名
     * @return {HttpResponse} result
     */
    static async login1(params) {   // 接口一
        return http.post('/login',params)
    }
    static async login2(params) {   // 接口二
        return http.post('/login',params)
    }
    static async login3(params) {   // 接口三
        return http.post('/login',params)
    }
}

export class landRelevant {     // 模块二
    /**
     * @description 获取地列表
     * @return {HttpResponse} result
     */
    static async landList(params) {
        return http.get('/land_list_info',params)
    }
}
```

### 六、应用

无需在`main.ts`内引入，需要什么模块的接口在相应页面引入改模块即可

```vue
<script setup>
import { onMounted } from "vue";
import {UserService} from '/src/api/api.ts'

onMounted(()=>{
  login1()
  login2()
})

const login1 = async () => {
  const loginParams = {
    username: 'test',
    password: 'test',
  }
  const res = await UserService.login1(loginParams)
  // console.log(res)
}

const login2 = () => {
  const loginParams = {
    username: 'test',
    password: 'test',
  }
  UserService.login2(loginParams).then((res)=>{
    // console.log(res)
  })
}
</script>
```

## 状态管理 pinia

### 安装 pinia

Pinia 与 Vuex 的区别：

- `id` 是必要的，它将所使用 store 连接到 devtools。
- 创建方式：`new Vuex.Store(...)`(vuex3)，`createStore(...)`(vuex4)。
- 对比于 vuex3 ，state 现在是一个`函数返回对象`。
- 没有 `mutations`，不用担心，state 的变化依然记录在 devtools 中。

```bash
# 安装
yarn add pinia
```

main.ts 中增加

```js
# 引入
import { createPinia } from "pinia"
# 创建根存储库并将其传递给应用程序
app.use(createPinia())
```

在 `src` 文件夹下新增 `store` 文件夹,接在在 store 中新增 `main.ts`

### 创建 `store`, index.ts :

```js
import { defineStore } from 'pinia'

export const mainStore = defineStore('main',{
  state: () => ({
    count: 1,
    data: {
      name: 'Jerry',
      sex: '男'
        },
    list:['orange','green','purple','white']
    }),
    // getter 第一个参数是 state，是当前的状态，也可以使用 this 获取状态
  // getter 中也可以访问其他的 getter，或者是其他的 Store
  getters: {
    // 通过 state 获取状态
    doubleCount: (state) => state.count * 2,
    // 通过 this 获取状态（注意this指向）
    tripleCount() {
      return this.count * 3
      },
    single() {
        return this.tripleCount*2
    }
  },
    actions: {
        updateData(newData, count) {
            // 使用 this 直接修改
            this.data = { ...newData }
            this.count = count * 2
    
            // 使用 $patch 修改多个值
            this.$patch({
                data: { ...newData },
                count: count * 2
            })
        }
    }
})
```

### 组建中获取 store 

```vue
//Pinia.vue
<template>
<h2>{{store.count}}</h2>
<p>{{store.data.name}}</p>
<ul>
    <li v-for="(item) in store.list" key="item">{{item}}</li>
</ul>
<hr>
<button @click="store.updateData(newdata,count)">更新</button>
<h2>{{store.doubleCount}}</h2>
<h2>{{store.tripleCount}}</h2>
<h2>{{store.single}}</h2>
</template>

<script setup lang="ts">
 import { mainStore } from "../store/index";
 const store = mainStore();

 const newdata= reactive({name:'zs',sex:'女'})
 const count = ref(5)
</script>

<style lang="scss" scoped>
</style>
```

## 国际化i18n设置

### 项目安装vue-i18n

需要安装最新版的vue-i18n

```javascript
npm install vue-i18n@next --save
```

或者用yarn

```javascript
yarn add vue-i18n@next --save
```

### 在项目src文件夹中新建lang文件夹

新建lang文件夹，在lang文件夹中新建三个js文件:

#### zh.js

```js
const zh = {
    // layout
    commons: {
        xiaoai: '小爱',
        admin: '管理员',
        editor: '赵晓编',
        quit: '退出',
        hi: '您好',
        index: '首页',
        userManage: '用户管理',
        share: '分享功能',
        infoManage: '信息管理',
        infoShow: '个人信息',
        infoShow1: '个人信息子菜单1',
        infoShow2: '个人信息子菜单2',
        infoShow3: '个人信息子菜单3',
        infoShow4: '个人信息子菜单4',
        infoShow5: '个人信息子菜单5',
        infoModify: '修改信息',
        infoModify1: '修改信息子菜单1',
        infoModify2: '修改信息子菜单2',
        infoModify3: '修改信息子菜单3',
        fundManage: '资金管理',
        fundList: '资金流水',
        chinaTabsList: '区域投资',
        fundData: '资金数据',
        fundPosition: '投资分布',
        typePosition: '项目分布',
        incomePayPosition: '收支分布',
        permission: '权限设置',
        pagePer: '页面权限',
        directivePer: '按钮权限',
        errorPage: '错误页面',
        page401: '401',
        page404: '404',
        wechatNumber: '微信号',
    },
    index: {
        yearLoss: '年度总盈亏',
        yearProfit: '年度收益率',
        potentialInvestor: '潜在投资人',
        intentionInvestor: '意向投资人',
        waitExamineInvestor: '待审投资人',
        examiningInvestor: '审核中投资人',
        tenMillion: '千万元',
        person: '人',
    },
}

export default zh
```

#### en.js

```js
const en = {
    // layout
    commons: {
        xiaoai: 'Ai.',
        admin: 'Admin',
        editor: 'Editor',
        quit: 'Sign Out',
        hi: 'Hi',
        index: 'Dashboard',
        userManage: 'Users',
        share: 'Share',
        infoManage: 'Infos',
        infoShow: 'InfoShow',
        infoShow1: 'InfoShow1',
        infoShow2: 'InfoShow2',
        infoShow3: 'InfoShow3',
        infoShow4: 'InfoShow4',
        infoShow5: 'InfoShow5',
        infoModify: 'InfoModify',
        infoModify1: 'InfoModify1',
        infoModify2: 'InfoModify2',
        infoModify3: 'InfoModify3',
        fundManage: 'Money',
        fundList: 'MoneyList',
        chinaTabsList: 'AreaList',
        fundData: 'FundData',
        fundPosition: 'FundPosition',
        typePosition: 'TypePosition',
        incomePayPosition: 'IncomePayPosition',
        permission: 'Permission',
        pagePer: 'PagePermission',
        directivePer: 'DirectivePermission',
        errorPage: 'ErrorPage',
        page401: '401',
        page404: '404',
        wechatNumber: 'wechat',
    },
    index: {
        yearLoss: 'Year Loss',
        yearProfit: 'Year Profit',
        potentialInvestor: 'Potential Investor',
        intentionInvestor: 'Intention Investor',
        waitExamineInvestor: 'Wait Examine Investor',
        examiningInvestor: 'Examining Investor',
        tenMillion: 'Ten Million',
        person: 'P',
    },
}

export default en
```

#### index.js

```js
import { createI18n } from 'vue-i18n'

import zh from './zh'
import en from './en'

// 语言库
const messages = {
    zh: zh,
    en: en,
}

// 默认语言
// const langDefault = 'zh-CN'
const langDefault = 'zh'

const i18n = createI18n({
    locale: langDefault, //默认显示的语言
    messages,
})

export default i18n // 将i18n暴露出去，在main.js中引入挂载
```

### main.ts配置

```ts
import i18n from './lang'
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App); // 创建实例

app.use(i18n);
app.mount("#app");
```

### vue组件使用

```vue
<!--  -->
<template>
    <div class="">
         <select  @change="changeLangeuage($event)">
            <option value ="cn">中文</option>
            <option value ="en">英文</option>
        </select>
        <hr>
        <button @click="changeLangeuage">切换语言</button>
        <h2>{{$t('commons.admin')}}</h2>
        <h2>{{$t('commons.quit')}}</h2>
    </div>
</template>

<script setup lang="ts">
import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const changeLangeuage = () =>{
    proxy.$i18n.locale = proxy.$i18n.locale === 'en' ? 'zh' : 'en'
}
</script>

<style lang="scss" scoped>
    
</style>
```

## Mock数据

### 安装依赖

```shell
npm i mockjs -S
npm i vite-plugin-mock -D

yarn add mockjs
yarn add vite-plugin-mock -D
```

### `package.json`

```json
{
  "dependencies": {
    "mockjs": "^1.1.0",
  },
  "devDependencies": {
    "vite-plugin-mock": "^2.9.6"
  }
}
```

#### `vite.config.js`

```javascript
import { viteMockServe } from 'vite-plugin-mock'

export default ({ command }) => {
  return {
    plugins: [
      //mock配置
        viteMockServe({
          mockPath: './src/mock',  // 指定 mock 数据文件夹路径
          supportTs: true,  // 启用 ts
        }),
    ],
  }
}
```

### 创建mock文件

在项目根目录创建mock文件夹，在文件夹中创建test.js文件，`mock/test.js`

```javascript
// 仅做示例: 通过GET请求返回一个名字数组
export default [
    {
        url: '/api/getUsers',
        method: 'get',
        response: () => {
            return {
                status: 200,
                message: 'ok',
                data: ['tom', 'jerry'],
            }
        },
    },
]
```

### 配置api接口

```ts
import http from './http'

export class landRelevant {     // 模块二
    static async mockTest1(params) {
        return http.get('/getUsers',params)
    }
}
```

### vue使用

```vue
<!--  -->
<template>
    <div class="">
        
    </div>
</template>

<script setup>
import {landRelevant} from '../api/api.ts'


onMounted(()=>{
  test1()
})

const test1 = async () => {
  const res = await landRelevant.mockTest1({})
  console.log(res)
}

    
</script>
<!-- <script setup>
import axios from 'axios'

const a = async ()=>{
    const { data } = await axios.get('/api/getUsers')
    console.log(data.status);
    console.log(data.data);
}
a()

    
</script> -->
```

## 

