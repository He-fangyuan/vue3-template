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
    static async mockTest1(params) {
        return http.get('/getUsers',params)
    }
}