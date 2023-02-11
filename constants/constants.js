const walkthrough_01_01_images = [
    require("../assets/images/walkthrough/walkthrough_01_01.png"),
    require("../assets/images/walkthrough/walkthrough_01_02.png"),
    require("../assets/images/walkthrough/walkthrough_01_03.png"),
    require("../assets/images/walkthrough/walkthrough_01_04.png"),
]

const walkthrough_01_02_images = [
    require("../assets/images/walkthrough/walkthrough_01_05.png"),
    require("../assets/images/walkthrough/walkthrough_01_06.png"),
    require("../assets/images/walkthrough/walkthrough_01_07.png"),
    require("../assets/images/walkthrough/walkthrough_01_01.png"),
]

const walkthrough = [
    {
        id: 0,
        title: "다양한 포즈 경험",
        sub_title: "nn개의 다양한 포즈로 새로운 사진 촬영 경험 제공",
    },
    {
        id: 1,
        title: "나만의 포즈 추천",
        sub_title: "나의 취향을 반영한 나만의 포즈 추천",
    },
    {
        id: 2,
        title: "혼자도 여럿이도 가능",
        sub_title: "필요한 상황에, 분위기에 맞게 재밌는 촬영",
    },
    {
        id: 3,
        title: "무슨말을 하지",
        sub_title: "졸프 화이팅",
    },
]

const home_tabs = [
    {
        id: 0,
        label: "Product"
    },
    {
        id: 1,
        label: "My Chart"
    },
    {
        id: 2,
        label: "Service"
    }
]

const dashboard_screens = {
    home: "Home",
    category: "Category",
    promo: "Promo",
    profile: "Profile",
}

const bottom_tabs = [
    {
        id: 0,
        label: dashboard_screens.home,
    },
    {
        id: 1,
        label: dashboard_screens.category,
    },
    {
        id: 2,
        label: dashboard_screens.promo,
    },
    {
        id: 3,
        label: dashboard_screens.profile,
    }
]

const scan_product_option = {
    qr: "QR",
    camera: "CAMERA"
}

export default {
    walkthrough_01_01_images,
    walkthrough_01_02_images,
    walkthrough,
    home_tabs,
    dashboard_screens,
    bottom_tabs,
    scan_product_option
}