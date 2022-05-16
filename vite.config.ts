import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig((env) => {
    // env 环境变量
    const viteEnv = loadEnv(env.mode, `.env.${env.mode}`)
    return {
        plugins: [
            vue(),
            AutoImport({
                resolvers: [NaiveUiResolver()],
                imports: ['vue','vue-router'],
            }),
            Components({
                resolvers: [NaiveUiResolver()],
                // 指定组件位置，默认是src/components
                dirs: ['src/components'],
                // ui库解析器
                // resolvers: [ElementPlusResolver()],
                extensions: ['vue'],
                // 配置文件生成位置
                dts: 'src/components.d.ts',
            }),
            //SVG配置
            createSvgIconsPlugin({
                // 指定需要缓存的图标文件夹
                iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
                // 指定symbolId格式
                symbolId: 'icon-[dir]-[name]',
            }),
            //mock配置
            viteMockServe({
              mockPath: './src/mock',  // 指定 mock 数据文件夹路径
              supportTs: true,  // 启用 ts
            }),
        ],
        base: viteEnv.VITE_BASE_URL, // 在生产中服务时的基本公共路径。
        resolve: {
            alias: {
                '@': resolve(__dirname, './src'), // 这里是将src目录配置别名为 @ 方便在项目中导入src目录下的文件
            },
        },

        //配置scss
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/assets/style/mian.scss";',
                },
            },
        },
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
            }, //去除 console debugger
        },
        // 本地运行配置，及反向代理配置
        server: {
            host: 'localhost', // 指定服务器主机名
            port: 8080, // 指定服务器端口
            open: true, // 在服务器启动时自动在浏览器中打开应用程序
            strictPort: false, // 设为 false 时，若端口已被占用则会尝试下一个可用端口,而不是直接退出
            https: false, // 是否开启 https
            cors: true, // 为开发服务器配置 CORS。默认启用并允许任何源
            proxy: {
                // 为开发服务器配置自定义代理规则
                // 字符串简写写法
                '/foo': 'http://192.168.xxx.xxx:xxxx',
                // 选项写法
                '/api': {
                    target: 'http://192.168.xxx.xxx:xxxx', //代理接口
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
        },
    }
})
