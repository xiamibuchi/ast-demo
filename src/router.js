import Vue from "vue";
import VueRouter from "vue-router";
import RouterPrefetch from "vue-router-prefetch";
Vue.use(VueRouter);
Vue.use(RouterPrefetch);
import Cookie from "js-cookie";
import store from "@/store";
import _ from "lodash";
import { savePagePosition } from "@/memory-store";
import scrollTop from "@/utils/scrollTop";

// 不要删, 这是 ssr 标记。 routes start
// eslint-disable-next-line no-unused-vars
const Home = () => import("@/layouts/HomeLayout.vue");

const AppDetail = () => import("@/views/app/AppDetail.vue");
// const AppReview = () => import('@/views/app/AppReview.vue');
// const AppCommentary = () => import('@/views/app/AppCommentary.vue');
const AppReviewLayout = () => import("@/views/app/AppReviewLayout.vue");

const AppForum = () => import("@/views/app/Forum.vue");

const Auth = () => import("@/views/auth/Index.vue");
const PhoneLogin = () => import("@/views/auth/PhoneLogin.vue");
const EmailLogin = () => import("@/views/auth/EmailLogin.vue");

const GameList = () => import("@/views/game-list/Index");
const TagGameList = () => import("@/views/tag/TagGameList");
const GameCohesionList = () => import("@/views/tag/GameCohesionList");

const SingleRank = () => import("@/views/rank/Index");

const ReviewDetailWeb = () => import("@/views/review-detail/ReviewDetailWeb");

const RecommendUsers = () => import("@/views/RecommendUsers");
const RecommendReviews = () => import("@/views/RecommendReviews");
const ErrorPage = () => import("@/views/error/ErrorPage");
const Empty = () => import("@/views/error/Empty");
const setting = () => import("@/views/setting/setting");
const language = () => import("@/views/setting/language");
const SearchWeb = () => import("@/views/search/SearchWeb");
const Event = () => import("@/views/event/Event");
const TopicDetail = () => import("@/views/topic/TopicDetail");

const MomentDetailWeb = () => import("@/views/moment/web/MomentDetailWeb");

const Video = () => import("@/views/video/home/Entry");
const VideoPage = () => import("@/views/video/video-page/Entry");
const VideoCommentDetail = () => import("@/views/video/VideoCommentDetail");
const MomentCommentDetail = () => import("@/views/moment/MomentCommentDetail");

const Find = () => import("@/views/find/Find");

// const Moment = () => import('@/views/moment/Moment');
const MomentWeb = () => import("@/views/moment/web/MomentWeb");

// eslint-disable-next-line no-unused-vars
const Forum = () => import("@/views/forum/Forum");

const ManagePayment = () => import("@/views/payment/Manage");

const HomeLayout = () => import("@/views/home/Layout");

const CommentaryDetail = () =>
  import("@/views/commentary-detail/CommentaryDetail");

const routes = [
  {
    path: "/(android|ios)",
    name: "DeviceRecommend",
    component: HomeLayout,
    redirect: {
      name: "Recommend"
    },
    redirectStatus: 301,
    meta: {
      ssrTestPath: "/"
    }
  },
  {
    path: "/",
    name: "Recommend",
    component: HomeLayout,
    meta: {
      cacheKey: "Home",
      isFirstLevelPage: true,
      useNewLayout: true,
      ssrTestPath: "/",
      canDeActiveFocus: true
    }
  },
  {
    path: "/upcoming",
    name: "Upcoming",
    component: HomeLayout,
    meta: {
      cacheKey: "Home",
      isFirstLevelPage: true,
      useNewLayout: true,
      ssrTestPath: "/upcoming",
      canDeActiveFocus: true
    }
  },
  {
    path: "/video/create",
    name: "CreateVideo",
    component: ErrorPage,
    props: { code: 404, title: "上传视频", text: "开发中" },
    meta: {
      needSSR: false
    }
  },
  // web pc 使用 videolayout 实现小窗视频
  {
    path: "/video",
    name: "VideoHome",
    meta: {
      isFirstLevelPage: true,
      cacheKey: store.state.isMobile ? "Home" : "VideoHome",
      useNewLayout: store.state.isMobile,
      ssrTestPath: "/video"
    },
    component: store.state.isMobile ? HomeLayout : Video
  },
  {
    path: "/video/:id(\\d+)",
    name: "VideoPage",
    component: VideoPage,
    props: true,
    meta: {
      // cacheKey: 'VideoPage',
      // isFirstLevelPage: true,
      ssrTestPath: "/video/1669954",
      backgroundColor: "#fff",
      updateKey: "WebVideoPage" // 意味着会以这个key不断更新Node
    }
  },
  {
    path: "/video/comment/:id",
    name: "VideoCommentPage",
    component: VideoCommentDetail,
    meta: {
      ssrTestPath: "/video/comment/1186180"
    }
  },
  {
    path: "/moment/comment/:id",
    name: "MomentCommentPage",
    component: MomentCommentDetail,
    meta: {
      ssrTestPath: "/moment/comment/1809399"
    }
  },
  {
    path: "/app/:id",
    name: "AppDetail",
    component: AppDetail,
    props: route => ({ appId: route.params.id }),
    meta: { needSSR: false, useNewLayout: true }
  },
  {
    path: "/app/:id/review",
    name: "AppReview",
    component: AppReviewLayout,
    meta: {
      useNewLayout: true,
      ssrTestPath: "/app/37782/review"
    }
  },
  {
    path: "/app/:id/commentary",
    name: "AppCommentary",
    component: AppReviewLayout,
    meta: {
      useNewLayout: true,
      ssrTestPath: "/app/37782/commentary"
    }
  },
  {
    path: "/app/:id/topic",
    name: "AppForum",
    component: AppForum,
    meta: { needSSR: false }
  },
  {
    path: "/auth/login",
    component: Auth,
    props: true,
    meta: { needSSR: false },
    children: [
      {
        path: "/auth/login",
        name: "Auth",
        component: PhoneLogin,
        props: true,
        meta: { needSSR: false }
      },
      {
        path: "/auth/email/login",
        name: "EmailLogin",
        component: EmailLogin,
        props: true,
        meta: { needSSR: false }
      }
    ]
  },
  {
    path: "/category/e:id",
    name: "TopicList",
    component: GameList,
    props: true,
    meta: { needSSR: false }
  },

  {
    path: "/top/:type?/:label?",
    name: "Ranking",
    component: SingleRank,
    props: true,
    meta: {
      isFirstLevelPage: true,
      needSSR: false
    }
  },
  {
    path: "/tag/:tagName",
    name: "TagGameList",
    component: TagGameList,
    props: true,
    meta: {
      needSSR: false
    }
  },
  {
    path: "/app-list",
    name: "GameCohesionList",
    component: GameCohesionList,
    props: true,
    meta: {
      useNewLayout: true,
      ssrTestPath:
        "/app-list?token=eyJ0aXRsZSI6IkRpc2NvdmVyIFN1cGVyYiBHYW1lcyIsImFwcF9pZHMiOiIxNTk2Miw3MjE1NCw4NDA0NywxNzk5MTcsMTQ4NjU1LDM4NDA2LDU4MDYwLDQxMTcyLDE5MDQ4OSw1NzQ0Niw4NDA0Niw4NDA0NSwxODU4MDgsMTMwODA0LDYyNzUxLDg5MzYsMTg3NTA2LDQ5MDg2LDk4NTEsMTc3NzExIn0.dJmR7Q1NABmhiNDk7n7VGqT4c_D2nczvvCNdi4Ex--0"
    }
  },
  {
    path: "/user/hot",
    name: "UserHot",
    component: RecommendUsers,
    meta: {
      needSSR: false
    }
  },
  {
    path: "/user/:id",
    name: "UserProfile"
  },
  {
    path: "/review/new",
    name: "RecommendVerifiedReviews",
    props: { type: "recommend" },
    component: RecommendReviews,
    meta: {
      needSSR: false
    }
  },
  {
    path: "/review/:id",
    name: "ReviewDetail",
    component: ReviewDetailWeb,
    meta: {
      useNewLayout: true,
      ssrTestPath: "/review/22120934"
    }
  },
  {
    path: "/topic/:id",
    name: "TopicDetail",
    component: TopicDetail,
    meta: { needSSR: false }
  },
  {
    path: "/moment/:id",
    name: "MomentDetail",
    component: MomentDetailWeb,
    meta: {
      ssrTestPath: "/moment/81351423903665497"
    }
  },
  {
    path: "/event/:uri",
    name: "Event",
    component: Event,
    props: true,
    meta: {
      needSSR: false
    }
  },
  // ========== language 和 setting 不应该有路由（无法对应 www 页面），使用 van-popup 实现
  {
    path: "/setting",
    name: "setting",
    component: setting,
    meta: {
      needSSR: false
    }
  },
  {
    path: "/language",
    name: "language",
    component: language,
    meta: {
      needSSR: false
    }
  },
  // ========== language 和 setting 不应该有路由（无法对应 www 页面），使用 van-popup 实现
  {
    path: "/event/:id",
    name: "Event",
    component: ErrorPage,
    props: { code: 404, title: "专题", text: "开发中" },
    meta: {
      needSSR: false
    }
  },
  {
    path: "/payment/settings/cards",
    name: "ManagePayment",
    component: ManagePayment,
    meta: { requireAuth: true, needSSR: false }
  },
  {
    path: "/search",
    name: "searchPage",
    component: Empty,
    meta: {
      needSSR: false
    }
  },
  {
    path: "/search/apps",
    name: "searchApp",
    component: ErrorPage,
    meta: {
      needSSR: false
    }
  },
  {
    path: "/search/developers",
    name: "searchDevelopers",
    component: ErrorPage,
    meta: {
      needSSR: false
    }
  },
  {
    path: "/search/tags",
    name: "searchTags",
    component: ErrorPage,
    meta: {
      needSSR: false
    }
  },
  {
    path: "/search/:type?/:keywords?",
    name: "search",
    component: SearchWeb,
    props: true,
    meta: {
      ssrTestPath: "/search/apps/原神"
    }
  },
  // FIXME: start 应该属于PHP的路由
  {
    path: "/forum/groups/(game|official)",
    name: "ForumGame",
    redirect: { name: "ErrorPage" },
    meta: {
      needSSR: false
    }
  },
  {
    path: "/forum/g:id(\\d+)?",
    name: "ForumGroupOfficial",
    redirect: { name: "ErrorPage" },
    meta: {
      needSSR: false
    }
  },
  {
    path: "/forum/a:id(\\d+)",
    name: "ForumGroupApp",
    redirect: { name: "ErrorPage" },
    meta: {
      needSSR: false
    }
  },
  {
    path: "/forum/followed/apps",
    name: "ForumFollowed",
    redirect: { name: "ErrorPage" },
    meta: {
      needSSR: false
    }
  },
  {
    path: "/forum/popular-topic-list",
    name: "ForumPopular",
    redirect: { name: "ErrorPage" },
    meta: {
      needSSR: false
    }
  },
  {
    path: "/forum/strategy/:channel?",
    name: "ForumStrategy",
    redirect: { name: "ErrorPage" },
    meta: {
      needSSR: false
    }
  },
  // end
  {
    path: "/forum/:type?/:label?",
    name: "Moment",
    component: MomentWeb,
    meta: {
      isFirstLevelPage: true,
      ssrTestPath: "/forum/hot"
    }
  },
  {
    path: "/categories",
    name: "Discover",
    component: Find,
    meta: {
      isFirstLevelPage: true,
      needSSR: false
    }
  },
  {
    path: "/commentary/:id",
    name: "CommentaryDetail",
    component: CommentaryDetail,
    meta: {
      useNewLayout: true,
      ssrTestPath: "/commentary/96666766935068287"
    }
  },
  {
    path: "/payment/order/:id/confirm",
    name: "OrderConfirm"
  },
  {
    path: "/app/:id/test",
    name: "TestFlight"
  },
  {
    path: "/qrcode/app",
    name: "OpenClientAppDetail"
  },
  {
    path: "/app/:id/debate",
    name: "debateApp"
  },
  {
    path: "/award/:id",
    name: "awardList"
  },
  {
    path: "/relate/:id",
    name: "RelateGameList",
    meta: {
      needSSR: false
    }
  },
  {
    path: "*",
    name: "ErrorPage",
    component: ErrorPage,
    props: { code: 404, title: "404" },
    meta: {
      needSSR: false
    }
  }
];

// routes end (不要删, 这是 ssr 标记)

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
  scrollBehavior(to, from, savedPosition) {
    const fromPage = _.get(from, "path");
    const toPage = _.get(to, "path");
    if (fromPage === toPage) {
      return;
    }
    if (savedPosition) {
      return savedPosition;
    }
    if (savePagePosition(toPage)) {
      return savePagePosition(toPage);
    } else if (fromPage !== toPage) {
      return { x: 0, y: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(current => current.meta.requireAuth)) {
    // 验证有没有登录
    const userId = Cookie.get("user_id");
    if (userId) {
      next();
    } else {
      location.href = "/auth/login"; // TODO: 通过 env 判断 isWWW, false 时使用 history 模式
      // next({
      //   name: 'PhoneLogin',
      //   query: { redirect: to.fullPath }
      // })
    }
  }
  // 离开页面前清除分享数据
  if (_.get(to, "path") !== _.get(from, "path")) {
    store.commit("setShareData", null);
  }
  // 一级页面自动缓存滚动位置
  if (_.get(from, "meta.isFirstLevelPage", false)) {
    savePagePosition(from.path, { x: 0, y: scrollTop() });
  }

  // 背景色设置
  if (_.get(to, "meta.backgroundColor")) {
    document.querySelector("body").style.backgroundColor = _.get(
      to,
      "meta.backgroundColor"
    );
  } else {
    document.querySelector("body").removeAttribute("style");
  }

  next();
});

export default router;
