import axios from 'axios';

export default (await import('vue')).defineComponent({
name: 'AppMain',
data() {
return {
posts: [],
};
},
methods: {
getPosts() {
axios.get('http://127.0.0.1:8000/api/posts', {
params: {}
})
.then((response) => {
console.log(response.data.results.data);
this.posts = response.data.results.data;

})
.catch(function (error) {
console.warn(error);
});
}
},

created() {
this.getPosts();
}
});
const __VLS_componentsOption = {};
const __VLS_name = 'AppMain' as const;
function __VLS_template() {
let __VLS_ctx!: InstanceType<__VLS_PickNotAny<typeof __VLS_internalComponent, new () => {}>> & {};
/* Components */
let __VLS_otherComponents!: NonNullable<typeof __VLS_internalComponent extends { components: infer C; } ? C : {}> & typeof __VLS_componentsOption;
let __VLS_own!: __VLS_SelfComponent<typeof __VLS_name, typeof __VLS_internalComponent & (new () => { $slots: typeof __VLS_slots; })>;
let __VLS_localComponents!: typeof __VLS_otherComponents & Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
let __VLS_components!: typeof __VLS_localComponents & __VLS_GlobalComponents & typeof __VLS_ctx;
/* Style Scoped */
type __VLS_StyleScopedClasses = {};
let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[];
/* CSS variable injection */
/* CSS variable injection end */
let __VLS_resolvedLocalAndGlobalComponents!: {};
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
}
var __VLS_slots!: {};
return __VLS_slots;
}
let __VLS_internalComponent!: typeof import('./AppMain.vue')['default'];
