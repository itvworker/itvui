<template>
    <div class="itv">
        <div
            class="preview"
            ref="box"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
        >
            <div class="preview__bg"></div>
            <div
                class="preview__scroll-wrap"
                @click="closeImage"
            >
                <div class="preview__container">
                    <div class="preview__item"></div>
                    <div class="preview__item"></div>
                    <div class="preview__item"></div>
                </div>
                <div class="preview__ui preview__ui--hidden">
                    <div class="preview__top-bar">
                        <div class="preview__counter"></div>
                        <div
                            class="preview__button--close pixicon pixleft"
                            @click="close"
                        ></div>
                        <!--<button class="pix-photo-view__button pix-photo-view__button&#45;&#45;share" title="Share"></button>-->
                        <!-- <button class="pix-photo-view__button pix-photo-view__button--fs" title="Toggle fullscreen"></button> -->
                        <!-- <button class="pix-photo-view__button pix-photo-view__button--zoom" title="Zoom in/out"></button> -->
                        <div
                            class="preview__preloader"
                            v-show="false"
                        >
                            <div class="preview__preloader__icn">
                                <div class="preview__preloader__cut">
                                    <div class="preview__preloader__donut"></div>
                                </div>
                            </div>
                        </div>
                        <div
                            v-if="isdel"
                            class="preview-reload pixicon pixdelete"
                            @click="remove"
                        ></div>
                    </div>
                    <div class="preview__share-modal preview__share-modal--hidden preview__single-tap">
                        <div class="preview__share-tooltip"></div>
                    </div>
                    <button
                        style="display:none"
                        class="pix-photo-view__button pix-photo-view__button--arrow--left"
                        title="Previous (arrow left)"
                    >
                    </button>
                    <button
                        style="display:none"
                        class="pix-photo-view__button pix-photo-view__button--arrow--right"
                        title="Next (arrow right)"
                    >
                    </button>
                    <div class="preview__caption">
                        <div class="preview__caption__center"></div>
                    </div>
                </div>
            </div>
            <!-- <div class="preview-download pixicon pixdownload" @click="download"></div> -->
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import PhotoSwipe from "./photoswipe.js";
import UI from "./photoswipe-ui-default.js";

export default {
    name: "preview",
    props: {
        isShowBtn: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            arr: [],
            views: [],
            isdel: false
        };
    },

    methods: {
        download() {
            let index = this.photoswipe.getCurrentIndex();
            this.$emit("download", this.views[index].src);
        },
        async remove() {
            let index = this.photoswipe.getCurrentIndex();
            this.$emit("remove", index);
            if (this.arr.length >= 2) {
                this.photoswipe.destroy(true);
                this.arr.splice(index, 1);
                if (index === this.arr.length - 1) {
                    this.open(index - 1, this.arr);
                } else {
                    this.open(index, this.arr);
                }
            } else {
                this.close();
            }
        },
        async open(
            index,
            list,
            params = {
                captionEl: false,
                fullscreenEl: false,
                history: false,
                shareEl: false,
                pinchToClose: false,
                closeOnScroll: false,
                closeOnVerticalDrag: true //是否上下滑动关闭
            }
        ) {
            let arr = JSON.parse(JSON.stringify(list));

            this.arr = arr;
            let views = [];

            let options = Object.assign(
                {
                    index: Number(index) || 0
                },
                params
            );

            for (let i = 0, l = arr.length; i < l; i++) {
                if (!arr[i].w) {
                    let res = await this.calcStyles(arr[i].src);
                    views.push(res);
                } else {
                    views.push(arr[i]);
                }
            }

            this.views = views;

            this.photoswipe = new PhotoSwipe(
                this.$refs.box,
                UI,
                views,
                options
            );
            this.photoswipe.init();
            this.photoswipe.listen("close", () => {
                this.photoswipe = false;
                this.$emit("close");
            });
        },
        closeImage(e) {
            let img = e.target.nodeName.toLowerCase();
            if (img === "img") {
                this.close();
            }
        },
        close() {
            this.photoswipe.close();
        },
        async calcWidthHeight(index) {
            for (let i = index, l = this.images.length; i < l; i++) {
                let res = await this.calcStyles(this.images[i].src);

                this.imagesWidthHeight.push(res);
            }
        },
        calcStyles(url) {
            return new Promise(resolve => {
                let img = new Image();
                img.src = url;
                img.onload = function() {
                    resolve({
                        w: img.width,
                        h: img.height,
                        src: url,
                        loaded: true,
                        loading: false
                    });
                };
            });
        }
    }
};
</script>
