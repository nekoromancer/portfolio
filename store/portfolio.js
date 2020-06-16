export const state = () => ({
    list: [
        {
            name: '시간 언제 되세요(When will you be alright)?',
            description: '개인 프로젝트. 모임 시간을 조율하기 위해 사용하는 웹앱',
            terms: '2019. 3',
            skillSet: 'Nuxt.js(Vue.js), Lambda + API Gateway, MySQL',
            link: 'https://www.wwyba.app',
        },
        {
            name: '글로우픽',
            description: '현재 재직중인 (주)글로우데이즈에서 유지보수를 담당하고 있는 웹서비스',
            terms: '2018. 10 ~',
            skillSet: 'Nuxt.js(Vue.js)',
            link: 'https://www.glowpick.com',
        },
        {
            name: 'Konvini',
            description: '(주)로지포커스 재직 당시 유지보수를 담당했던 쇼핑몰',
            terms: '2018. 1 ~ 2018. 6',
            skillSet: 'PHP, jQuery',
            link: 'http://konvini.jp',
        },
        {
            name: '2016 Kia Sportage Digital Campaign',
            description: '2016 Kia All new Sportage 글로벌 프로모션 페이지. 다국어 지원은 Angular 모듈로 구현했다',
            terms: '2015. 12 ~ 2016. 1',
            myRole: 'Back-end, Front-end 전체 개발(100%)',
            skillSet: 'PHP(Slim Framework), Angluar, MySql',
            link: 'http://allaboutsportage.nekoromancer.kr',
        },
        {
            name: '현대 오너 캐어 캠페인(Japan)',
            description: '현대 오너 캐어 캠패인(OCC) 일본 홍보 사이트',
            terms: '2015. 4 ~ 2015. 5',
            myRole: 'Front-end 전체 개발(100%)',
            skillSet: 'jQuery',
            link: 'http://hyundai-occ.nekoromancer.kr',
        },
        {
            name: '라네즈 투톤 립바 프로모션 캠페인',
            description: '라네즈의 신제품 투톤 립바 프로모션 사이트. Facebook 캔버스 앱이었다. 당시 이런 진단형식의 사이트가 유행했었다',
            terms: '2015. 3',
            myRole: 'Back-end, Front-end 전체 개발(100%)',
            skillSet: 'Laravel, MySQL, Angular',
            link: 'http://laneige-two-tone-lip-bar.nekoromancer.kr',
        },
        {
            name: 'Kakao YellowID 12월 캠페인',
            description: 'Kakao YellowID 2차 홍보 캠페인 사이트.',
            terms: '2014. 11 ~ 2014. 12',
            myRole: 'Front-end 개발(100%)',
            skillSet: 'Angular',
            link: 'http://yellow-id-dec.nekoromancer.kr',
        },
        {
            name: 'Kakao YellowID 10월 캠페인',
            description: 'Kakao YellowID 1차 홍보 캠페인 사이트. 자동화툴을 본격적으로 도입한 프로젝트였다',
            terms: '2014. 9 ~ 2014. 10',
            myRole: 'Front-end 개발(100%)',
            skillSet: 'Angular',
            link: 'http://yellow-id-oct.nekoromancer.kr',
        },
        {
            name: '루프트한자와 떠나는 인생여정 캠페인',
            description: 'Facebook App. Angular를 처음 도입한 프로젝트로 jQuery를 함께 사용하는 만행을 저지르고 말았다.',
            terms: '2014. 6',
            myRole: 'Back-end, Front-end 전체 개발(100%)',
            skillSet: 'Angular, CodeIgniter',
        },
        {
            name: '전설의 화장품 프로모션 페이지',
            description: '신규 런칭하는 화장품 메이커 소개 페이지. 특기할 만한 사항은 없다.',
            terms: '2015. 3',
            myRole: 'Front-end 전체 개발(100%)',
            skillSet: 'Angular',
            link: 'http://legend-cosmetics.nekoromancer.kr',
        },
        {
            name: '신한카드, 잉여력 테스트',
            description: '신한카드 프로모션 사이트. 당시 유행하던 진단 사이트로 결과에 따라 카드를 추천해 주는 형식',
            terms: '2015.1',
            myRole: 'Front-end 전체 개발(100%)',
            skillSet: 'Angular',
            link: 'http://yingyeoking.nekoromancer.kr',
        },
        {
            name: 'GORETEX 소셜 쾌적대여소',
            description: '오프라인 행사와 연계한 고어텍스 프로모션용 이벤트 페이지',
            terms: '2016. 4',
            myRole: 'Back-end, Front-end 전체 개발(100%)',
            skillSet: 'Angular, SLIM(PHP), MySQL',
            Link: 'http://goretex-rental.nekoromancer.kr',
        },
    ],
    currentIndex: 0,
    currentLink: null,
});

export const getters = {
    getPortfolio (state) {
        const item = state.list[state.currentIndex];
        const result = [];

        Object.keys(item).forEach(key => {
            if (key !== 'link') {
                const content = item[key];
                const label = key.replace(/([A-Z])/g, ' $1');

                result.push(`${label.charAt(0).toUpperCase()}${label.slice(1)}: ${content}`);
            }
        });

        return result;
    },
};

export const mutations = {
    nextItem (state) {
        if (state.currentIndex === state.list.length - 1) {
            state.currentIndex = 0;
        } else {
            state.currentIndex++;
        }
    },
    prevItem (state) {
        if (state.currentIndex === 0) {
            state.currentIndex = state.list.length - 1;
        } else {
            state.currentIndex--;
        }
    },
    setLink (state) {
        if (state.list[state.currentIndex].link) {
            state.currentLink = state.list[state.currentIndex].link;
        } else {
            state.currentLink = null;
        }
    },
};

export const actions = {
    nextItem ({ commit }) {
        commit('nextItem');
        commit('setLink');
    },
    prevItem ({ commit }) {
        commit('prevItem');
        commit('setLink');
    },
};
