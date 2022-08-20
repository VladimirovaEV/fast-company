import httpService from "./http.service";

const professionEndPoint = "profession/";

const professionService = {
    get: async () => {
        const reg = await httpService.get(professionEndPoint);
        return reg.data;
    }
};
export default professionService;
