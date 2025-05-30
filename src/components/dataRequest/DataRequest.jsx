
function DataRequest() {
    //
    // let api = "https://cors-anywhere.herokuapp.com/https://www.copart.com/public/lots/search-results";
    // let body = {
    //     "query": ["*"],
    //     "filter": {
    //         "ODM": ["odometer_reading_received:[0 TO 9999999]"],
    //         "YEAR": ["lot_year:[2015 TO 2026]"],
    //         "MISC": ["#VehicleTypeCode:VEHTYPE_V"]
    //     },
    //     "sort": ["salelight_priority asc", "member_damage_group_priority asc", "auction_date_type desc", "auction_date_utc asc"],
    //     "page": 0,
    //     "size": 100,
    //     "start": 0,
    //     "watchListOnly": false,
    //     "freeFormSearch": false,
    //     "hideImages": false,
    //     "defaultSort": false,
    //     "specificRowProvided": false,
    //     "displayName": "",
    //     "searchName": "",
    //     "backUrl": "",
    //     "includeTagByField": {},
    //     "rawParams": {}
    // }
    //
    // fetch(api, {
    //     method: "POST",
    //     body: JSON.stringify(body),
    //     redirect: 'manual',
    //     headers: {
    //         "Authority": "www.copart.com",
    //         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    //         'Accept': 'application/json, text/plain, */*',
    //         'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
    //         'Content-Type': 'application/json',
    //         // 'Cookie': "\n" +
    //         //    "incap_ses_187_242093=apRhOjz1BFtdoVh/31uYAqIpLGgAAAAAjIhIiq26SEHwbAQ07CW6Ww==; visid_incap_242093=ZAT+DkGpRY2rDy91BWToQaIpLGgAAAAAQkIPAAAAAACAKXi8AbJ8wmQ6JN5UV+OJSKPOJxWDVlKw; userLang=en; anonymousCrmId=d1b02ba5-3760-4a61-a5a8-b537a6e7f55a; nlbi_242093=Wz/UNCckcwUg4PYEie/jegAAAAB9x7jqXEoX0R+V6ZKGj1xG; userCategory=RPU; timezone=Europe%2FMinsk; _gcl_au=1.1.1251278927.1747724724; _ga=GA1.1.1768094813.1747724724; lhnContact=5b90699c-5ffd-491a-9d35-40b5b8f302b8-22724-F57BP2t; lhnContact=5b90699c-5ffd-491a-9d35-40b5b8f302b8-22724-F57BP2t; g2usersessionid=02db60a883b957d26afa942ef1644a63; G2JSESSIONID=6CCB06DDB3D6943354893E8894E5B2BC-n1; incap_ses_877_242093=WKWCG1DVoBULHYptGbsrDKbALWgAAAAA4lMNMe+rDGAAXOCi5v9yKg==; reese84=3:qNCzzz34Whg8J/4CTiNFPw==:KBBCArSDoPSV+c/bn3JPhrrDLhVfadnXLok34Ymr7lQbvDkwEfbKH2e/t2+Hi9/tfvQBfuhMnQAwkZHMeMZJLCeaBIwR8H2j/KmNv3gYwDWDo/T4nH/YPaxsxAlx7FquXL0RcrjIn6h+yBnxyPnCZiKW9W3Dva8A1imRuTiBEyXpDrzaY4cAGyxr5bGPXe0MlaCyDlvRfYuwZDNXR8qa4ILvzlNxCYYKZg0kMl0HDaEDJHacxEyk5u+opSpz2eboXfF/2ndOmfIHiuV9SDu0/m0zXPZI3tm1L6T6Ei1D1EcaWoi040xvYwHhUVrivt6NvNBuLuHNFiJQak623btiWxjMjDHSWtUicUEA7oK8mLxtjmhXKmB9tpX4P2Kyr0k/eC46Sw6YYxC3U1+e4fPMS4/JdSbSDQnO/j19a0z8i2GXTMBm4p98JjFdTChBFPpBqv5qZ2h+RTfDUVlBPZDyfA==:jPQcNHqzrw5i29e5gS4CbGcRyLTP7GbPG14u+iJjaKY=; _clck=h4tl6e%7C2%7Cfw3%7C1%7C1966; _fs_dwell_passed=279df48a-2ce5-4c7f-b31c-14bcfb8b3dea; lhnStorageType=cookie; lhnStorageType=cookie; lhnJWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ2aXNpdG9yIiwiZG9tYWluIjoiIiwiZXhwIjoxNzQ3OTE1MzIwLCJpYXQiOjE3NDc4Mjg5MjAsImlzcyI6eyJhcHAiOiJqc19zZGsiLCJjbGllbnQiOjIyNzI0LCJjbGllbnRfbGV2ZWwiOiJiYXNpYyIsImxobnhfZmVhdHVyZXMiOltdLCJ2aXNpdG9yX3RyYWNraW5nIjp0cnVlfSwianRpIjoiNWI5MDY5OWMtNWZmZC00OTFhLTlkMzUtNDBiNWI4ZjMwMmI4IiwicmVzb3VyY2UiOnsiaWQiOiI1YjkwNjk5Yy01ZmZkLTQ5MWEtOWQzNS00MGI1YjhmMzAyYjgtMjI3MjQtRjU3QlAydCIsInR5cGUiOiJFbGl4aXIuTGhuRGIuTW9kZWwuQ29yZS5WaXNpdG9yIn19._CfDwJ9a0exC6XMv-VYSPZpsSWPDGzltqEsAZKDrikI; lhnJWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ2aXNpdG9yIiwiZG9tYWluIjoiIiwiZXhwIjoxNzQ3OTE1MzIwLCJpYXQiOjE3NDc4Mjg5MjAsImlzcyI6eyJhcHAiOiJqc19zZGsiLCJjbGllbnQiOjIyNzI0LCJjbGllbnRfbGV2ZWwiOiJiYXNpYyIsImxobnhfZmVhdHVyZXMiOltdLCJ2aXNpdG9yX3RyYWNraW5nIjp0cnVlfSwianRpIjoiNWI5MDY5OWMtNWZmZC00OTFhLTlkMzUtNDBiNWI4ZjMwMmI4IiwicmVzb3VyY2UiOnsiaWQiOiI1YjkwNjk5Yy01ZmZkLTQ5MWEtOWQzNS00MGI1YjhmMzAyYjgtMjI3MjQtRjU3QlAydCIsInR5cGUiOiJFbGl4aXIuTGhuRGIuTW9kZWwuQ29yZS5WaXNpdG9yIn19._CfDwJ9a0exC6XMv-VYSPZpsSWPDGzltqEsAZKDrikI; lhnRefresh=5edf4d79-a0b4-4fe8-8eec-b82b29205669; lhnRefresh=5edf4d79-a0b4-4fe8-8eec-b82b29205669; OptanonConsent=isGpcEnabled=0&datestamp=Wed+May+21+2025+15%3A11%3A24+GMT%2B0300+(%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C+%D1%81%D1%82%D0%B0%D0%BD%D0%B4%D0%B0%D1%80%D1%82%D0%BD%D0%BE%D0%B5+%D0%B2%D1%80%D0%B5%D0%BC%D1%8F)&version=202403.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=10242014-59bc-4cf8-8c2b-2fc2a7186342&interactionCount=1&isAnonUser=1&landingPath=NotLandingPage&AwaitingReconsent=false&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1%2CC0005%3A1; nlbi_242093_2147483392=JcRRfJpkrk/I/g6Gie/jegAAAABHWbs94WSd9EGHP/rh4rut; fs_lua=1.1747829484434; fs_uid=#o-76DP-eu1#e5953f04-27a4-4210-88f0-548b20dac756:279df48a-2ce5-4c7f-b31c-14bcfb8b3dea:1747828916324::3#/1779260733; copartTimezonePref=%7B%22displayStr%22%3A%22GMT%2B3%22%2C%22offset%22%3A3%2C%22dst%22%3Afalse%2C%22windowsTz%22%3A%22Europe%2FMinsk%22%7D; _ga_VMJJLGQLHF=GS2.1.s1747828918$o2$g1$t1747829485$j58$l0$h0$dmhD4xEffynqinFawROcghPlxNxjq62i_Pw; _uetsid=655589a0363b11f08025a9e286dd64f6; _uetvid=cd22fdc0354811f08ee8551b96e1d48a; FCNEC=%5B%5B%22AKsRol_41bP3JtYzUhYWpWSJQ3s64Wv3iE_892qrqfrealBHCCmFOwHzmJaaaWSwiGPHiw0FCwQgbtdvAYRxsLYlwLxHs9ip9gZ7c9hbjZQsn8VeAL1u1vnEem5HAbat-9NdDK7uDUgDYsYxB0Mr0cpG7vZ_vsY0dA%3D%3D%22%5D%5D; _clsk=1hor7v9%7C1747829486522%7C3%7C0%7Ci.clarity.ms%2Fcollect",
    //     }
    // })
    //     .then(res => {
    //         // console.log(res);
    //         // if(!res.ok) throw {error: `response status is ${res.status}`};
    //
    //         res.json()
    //             .then(res => {
    //                 console.log(res);
    //             })
    //     })
    //     .catch(err => {
    //         console.error(err);
    //     })

    


    fetch("https://auction-parser.onrender.com/getLastPage", {
        method:"POST",
    })
        .then(res=>{
            res.json()
                .then(res=>{
                    console.log(res);
                })
        })



}


export default DataRequest;