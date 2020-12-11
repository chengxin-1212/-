<template>
    <div class="about">
        <div class="left">
            <div class="img-con">
                <div>
                    <div class="img-box1" ref="imgBox1">
                        <canvas ref="canvas"></canvas>
                        <!-- <div class="x-box"></div>  @dragging="handleDragging"-->
                        <drag-it-dude
                            v-if="ruleForm.coverUrl"
                            ref="drag"
                            @dropped="handleDropped"
                            v-bind:style="{
                                height: dragwidth + 'rem',
                                width: dragwidth + 'rem',
                                left: '0px',
                                top: '0px',
                            }"
                        >
                        </drag-it-dude>
                        <!-- <div
                            class="left btn"
                            @touchstart.stop="hang"
                            @touchend.stop="hang"
                            @mousedown.stop="hang"
                            @mouseup.stop="hang"
                        ></div>
                        <div
                            class="top btn"
                            @touchstart.stop="hang"
                            @touchend.stop="hang"
                            @mousedown.stop="hang"
                            @mouseup.stop="hang"
                        ></div>
                        <div
                            class="right btn"
                            @touchstart.stop="hang"
                            @touchend.stop="hang"
                            @mousedown.stop="hang"
                            @mouseup.stop="hang"
                        ></div>
                        <div
                            class="bottom btn"
                            @touchstart.stop="hang"
                            @touchend.stop="hang"
                            @mousedown.stop="hang"
                            @mouseup.stop="hang"
                        ></div> -->
                    </div>
                    <div class="button-step box1">
                        <div class="btn btn1">1</div>
                        <el-upload
                            class="avatar-uploader"
                            action=""
                            :show-file-list="false"
                            :before-upload="beforeAvatarUpload"
                            v-model="ruleForm.coverFile"
                            :on-error="err"
                        >
                            <el-button
                                slot="trigger"
                                size="small"
                                type="primary"
                                >Load Picture</el-button
                            >
                        </el-upload>
                        <div class="s-list list-top">
                            <div class="style-list">
                            <div class="list-name w100">{{ arr[0].name }}</div>
                            <div>
                                <el-slider
                                    @change="input(0)"
                                    class="silder"
                                    :min="arr[0].min"
                                    :max="arr[0].max"
                                    v-model="arr[0].val"
                                ></el-slider>
                            </div>
                        </div>
                        <div class="style-list">
                            <div class="list-name w100">{{ arr[1].name }}</div>
                            <div>
                                <el-slider
                                    @change="input(1)"
                                    class="silder"
                                    :min="arr[1].min"
                                    :max="arr[1].max"
                                    v-model="arr[1].val"
                                ></el-slider>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="s-list">
                        <div class="s-list-tit button-step">
                            <div class="button-step-text">
                                <div class="btn btn2">2</div>
                                ADJUSTMENTS
                            </div>
                        </div>
                        <div class="style-list">
                            <div>
                                <el-radio
                                    @change="color"
                                    size="medium"
                                    v-model="radio"
                                    label="1"
                                    >Color</el-radio
                                >
                                <el-radio
                                    @change="color"
                                    size="medium"
                                    v-model="radio"
                                    label="2"
                                    >Grayscale</el-radio
                                >
                            </div>
                        </div>
                        <div class="style-list">
                            <div class="list-name">{{ arr[2].name }}</div>
                            <div>
                                <el-slider
                                    @change="input(2)"
                                    class="silder"
                                    :min="arr[2].min"
                                    :max="arr[2].max"
                                    v-model="arr[2].val"
                                ></el-slider>
                            </div>
                        </div>
                        <div class="style-list">
                            <div class="list-name">{{ arr[3].name }}</div>
                            <div>
                                <el-slider
                                    @change="input(3)"
                                    class="silder"
                                    :min="arr[3].min"
                                    :max="arr[3].max"
                                    v-model="arr[3].val"
                                ></el-slider>
                            </div>
                        </div>
                        <div class="style-list">
                            <div class="list-name">{{ arr[4].name }}</div>
                            <div>
                                <el-slider
                                    @change="input(4)"
                                    class="silder"
                                    :min="arr[4].min"
                                    :max="arr[4].max"
                                    v-model="arr[4].val"
                                ></el-slider>
                            </div>
                        </div>
                    </div>
                    <div class="img-box2">
                        <canvas ref="canvas2"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="resImg">
                <img :src="src.previewURL" alt="" />
            </div>
            <div class="rignt-btn">
                <div class="button-step">
                    <div class="btn btn3">3</div>
                    <el-button
                        size="small"
                        :loading="uplod"
                        @click="updata()"
                        type="primary"
                        >dotidoodle it
                    </el-button>
                </div>
                <div class="btn-text">
                    <p>Keep playing and creating</p>
                    <p>until you love, love, love it.</p>
                    <p class="text-top">Once you are happy</p>
                </div>
                <el-button
                    size="small"
                    :disabled="btnChangeEnable"
                    @click="toCart()"
                    type="primary"
                    >Add To Cart
                </el-button>
            </div>
        </div>
    </div>
</template>
<script>
import DragItDude from "vue-drag-it-dude";
export default {
    name: "About",
    components: {
        DragItDude,
    },
    data() {
        return {
            ruleForm: {
                coverUrl: "",
                coverFile: "",
            },
            img1200: "",
            img480: "",
            uplod: false,
            top: 0,
            left: 0,
            value1: 0,
            height: "200",
            canvasHeight: "200",
            dragwidth: 16.22222,
            rotate: 0,
            scale: 1,
            radio: "1",
            btnChangeEnable: true,
            src: {},
            onoff: true,
            Grayscaleoff: false,
            ele: null,
            interval: null,
            arr: [
                {
                    name: "Scale",
                    val: 50,
                },
                {
                    name: "Rotate",
                    val: 50,
                },
                // {
                //     name: "Grayscale",
                //     val: 0,
                //     onoff: true,
                // },
                {
                    name: "Brightness",
                    val: 50,
                },
                {
                    name: "Contrast",
                    val: 50,
                },
                {
                    name: "Saturation",
                    val: 100,
                    max: 200,
                    min: 50,
                },
            ],
        };
    },
    methods: {
        beforeAvatarUpload(file) {
            this.ruleForm.coverFile = file;
            this.imagePreview(this.ruleForm.coverFile);
            return false;
        },
        imagePreview: function (file) {
            var self = this;
            //定义一个文件阅读器
            var reader = new FileReader();
            //文件装载后将其显示在图片预览里
            reader.onload = function (e) {
                //将bade64位图片保存至数组里供上面图片显示
                self.ruleForm.coverUrl = e.target.result;
                self.initCanvas();
            };
            reader.readAsDataURL(file);
        },
        err(err) {
            console.log(JSON.parse(err));
        },
        initCanvas() {
            var canvas = this.$refs.canvas;
            var ctx = canvas.getContext("2d");
            canvas.width = 1200;
            canvas.height = 1200;
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.translate(1200 / 2, 1200 / 2);
            ctx.rotate((this.rotate * Math.PI) / 180);
            var self = this;
            var img = new Image();
            img.src = self.ruleForm.coverUrl;
            img.onload = function () {
                var s = img.height / img.width;
                if (s > 1) {
                    ctx.drawImage(
                        img,
                        600 - ((1200 / img.height) * img.width) / 2 - 600,
                        -600,
                        (1200 / img.height) * img.width,
                        1200
                    );
                } else if (s < 1) {
                    ctx.drawImage(
                        img,
                        -600,
                        600 - (1200 * img.height) / img.width / 2 - 600,
                        1200,
                        (1200 * img.height) / img.width
                    );
                } else {
                    ctx.drawImage(img, -600, -600, 1200, s * 1200);
                }

                // self.updata(canvas)
                self.img1200 = canvas.toDataURL("image/jpeg");
                self.generateCanvas();
            };
        },
        rgbToHsl: function (r, g, b) {
            (r /= 255), (g /= 255), (b /= 255);
            var max = Math.max(r, g, b),
                min = Math.min(r, g, b);
            var h,
                s,
                l = (max + min) / 2;

            if (max == min) {
                h = s = 0; // achromatic
            } else {
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                }
                h /= 6;
            }
            return [
                Math.floor(h * 100),
                Math.round(s * 100),
                Math.round(l * 100),
            ];
        },
        hslToRgb: function (h, s, l) {
            var r, g, b;

            if (s == 0) {
                r = g = b = l; // achromatic
            } else {
                var hue2rgb = function hue2rgb(p, q, t) {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1 / 6) return p + (q - p) * 6 * t;
                    if (t < 1 / 2) return q;
                    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                    return p;
                };

                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                var p = 2 * l - q;
                r = hue2rgb(p, q, h + 1 / 3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1 / 3);
            }

            return [
                Math.round(r * 255),
                Math.round(g * 255),
                Math.round(b * 255),
            ];
        },
        generateCanvas() {
            var canvas = this.$refs.canvas2;
            var ctx = canvas.getContext("2d");
            canvas.width = 480;
            canvas.height = 480;
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            var self = this;
            var img = new Image();
            img.src = this.img1200;
            img.onload = function () {
                var pixels;
                console.log(
                    (self.arr[0].val / 100) * 1200,
                    (self.arr[0].val / 100) * 1200
                );
                ctx.drawImage(
                    img,
                    self.left*1200,
                    self.top*1200,
                    (self.arr[0].val / 100) * 1200,
                    (self.arr[0].val / 100) * 1200,
                    0,
                    0,
                    480,
                    480
                );
                pixels = ctx.getImageData(0, 0, 480, 480);
                var pixeldata = pixels.data;
                var c = (self.arr[3].val - 50) / 100;
                var Br = (self.arr[2].val - 50) / 100;
                for (var i = 0, len = pixeldata.length; i < len; i += 4) {
                    if (self.Grayscaleoff) {
                        var gray =
                            (pixels.data[i] * 38 +
                                pixels.data[i + 1] * 75 +
                                pixels.data[i + 2] * 15) >>
                            7;
                        pixels.data[i] = gray;
                        pixels.data[i + 1] = gray;
                        pixels.data[i + 2] = gray;
                    }
                    var k = Math.tan(((45 + 44 * c) / 180) * Math.PI);
                    pixels.data[i] = self.goodcolor(
                        (pixels.data[i] - 127.5 * (1 - Br)) * k +
                            127.5 * (1 + Br)
                    );
                    pixels.data[i + 1] = self.goodcolor(
                        (pixels.data[i + 1] - 127.5 * (1 - Br)) * k +
                            127.5 * (1 + Br)
                    );
                    pixels.data[i + 2] = self.goodcolor(
                        (pixels.data[i + 2] - 127.5 * (1 - Br)) * k +
                            127.5 * (1 + Br)
                    );

                    var hslarr = self.rgbToHsl(
                        pixels.data[i],
                        pixels.data[i + 1],
                        pixels.data[i + 2]
                    );
                    var h = Math.round(hslarr[0]) / 100; //色调，处理成0-1之前数据
                    var s = Math.round(hslarr[1]) / 100; //饱和度
                    var l = Math.round(hslarr[2]) / 100; //亮度
                    var s2 = s * 0.01 * self.arr[4].val;
                    s = s2 > 1 ? 1 : s2 < 0 ? 0 : s2;
                    var rgbarr = self.hslToRgb(h, s, l);
                    pixels.data[i] = rgbarr[0];
                    pixels.data[i + 1] = rgbarr[1];
                    pixels.data[i + 2] = rgbarr[2];
                }
                ctx.putImageData(pixels, 0, 0);
                self.img480 = canvas.toDataURL("image/jpeg");
            };
        },
        imageDraw: function () {},
        goodcolor: function (num) {
            var x = num;
            if (num > 255) {
                x = 255;
            } else if (num < 0) {
                x = 0;
            }
            return x;
        },

        handleDropped() {
            this.left = parseInt(this.$refs.drag.elem.style.left)/parseInt(this.$refs.imgBox1.clientWidth );
            this.top = parseInt(this.$refs.drag.elem.style.top)/parseInt(this.$refs.imgBox1.clientWidth );
            this.generateCanvas();
        },
        grayscale() {
            this.generateCanvas();
        },
        color(index) {
            if (index == 2) {
                this.Grayscaleoff = true;
            } else {
                this.Grayscaleoff = false;
            }
            this.generateCanvas();
        },
        input(index) {
            if (index == 0) {
                this.dragwidth = (this.arr[index].val / 100) * 33.33333;
                console.log
                this.generateCanvas();
            } else if (index == 1) {
                this.rotate = ((this.arr[index].val - 50) / 25) * 180;
                this.initCanvas();
            } else {
                this.generateCanvas();
            }
        },
        toCart() {
            window.location.href = `http://mskpt.com/cart/?add-to-cart=149&quantity=3&mproject_url=<img src="${this.src.thumbURL}"/>&mproject_info=${this.src.projectID}`;
        },
        updata: function () {
            if (!this.img480) {
                return;
            }
            this.uplod = true;
            var img = this.img480;
            var size = parseInt(img.length);
            let xm = `<?xml version="1.0" encoding="UTF-8"?>
                        <SOAP-ENV:Envelope
                            xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
                            xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                            xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/">
                            <SOAP-ENV:Body
                                xmlns:NS1="urn:ezm_renderIntf-Iezm_render"
                                SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                                <NS1:MRDot_HY2>
                                    <size xsi:type="xsd:int">
                                        ${size}
                                    </size>
                                    <jpg xsi:type="xsd:base64Binary">${img}</jpg></NS1:MRDot_HY2>
                            </SOAP-ENV:Body>
                        </SOAP-ENV:Envelope>`;
            this.$axios
                .post(
                    "https://mosaictool.com/render/ezmr1.dll/soap/Iezm_render",
                    xm
                )
                .then((response) => {
                    this.uplod = false;
                    var parser = new DOMParser();
                    var xmlDoc = parser.parseFromString(
                        response.data,
                        "text/xml"
                    );
                    //获取DOM节点的标签为 dzLoginResult 的第一个节点对象
                    var MDotResponse = xmlDoc.getElementsByTagName(
                        "NS2:TMRmsg"
                    )[0].childNodes;
                    MDotResponse.forEach((item) => {
                        this.src[item.nodeName] = item.innerHTML;
                    });
                    // xmlDoc.getElementsByTagName('msg')[0];
                    if (this.src.msg == "Good Request") {
                        this.btnChangeEnable = false;
                    }
                })
                .catch((error) => {
                    self.uplod = false;
                });
        },
        hang(e) {
            if (!this.ruleForm.coverUrl) {
                return;
            }
            if (e.type == "mouseup" || e.type == "touchend") {
                if (this.interval) {
                    clearInterval(this.interval);
                    this.handleDropped();
                }
                return;
            }
            var left = parseInt(this.$refs.drag.elem.style.left);
            var top = parseInt(this.$refs.drag.elem.style.top);
            if (e.srcElement.classList[0] == "left") {
                if (left > 0) {
                    this.$refs.drag.elem.style.left = left - 1 + "px";
                } else {
                    return;
                }
            } else if (e.srcElement.classList[0] == "right") {
                if (left < 90) {
                    this.$refs.drag.elem.style.left = left + 1 + "px";
                } else {
                    return;
                }
            } else if (e.srcElement.classList[0] == "top") {
                if (top > 0) {
                    this.$refs.drag.elem.style.top = top - 1 + "px";
                } else {
                    return;
                }
            } else {
                if (top < 90) {
                    this.$refs.drag.elem.style.top = top + 1 + "px";
                } else {
                    return;
                }
            }
            this.handleDropped();
            this.interval = setInterval(() => {
                var left = parseInt(this.$refs.drag.elem.style.left);
                var top = parseInt(this.$refs.drag.elem.style.top);

                if (e.srcElement.classList[0] == "left") {
                    if (left > 0) {
                        this.$refs.drag.elem.style.left = left - 1 + "px";
                    } else {
                        return;
                    }
                } else if (e.srcElement.classList[0] == "right") {
                    if (left < 90) {
                        this.$refs.drag.elem.style.left = left + 1 + "px";
                    } else {
                        return;
                    }
                } else if (e.srcElement.classList[0] == "top") {
                    if (top > 0) {
                        this.$refs.drag.elem.style.top = top - 1 + "px";
                    } else {
                        return;
                    }
                } else {
                    if (top < 90) {
                        this.$refs.drag.elem.style.top = top + 1 + "px";
                    } else {
                        return;
                    }
                }
            }, 30);
        },
    },
};
</script>
<style lang="scss">
.el-radio__inner {
    width: 24px;
    height: 24px;
}
.el-radio__inner::after {
    width: 8px;
    height: 8px;
}
.el-radio__label {
    font-size: 18px;
}
.el-button {
    width: 256px;
    height: 60px;
    font-size: 30px;
    border-radius: 30px;
}
.s-list-tit {
    margin-bottom: 20px;
}
.box1 {
    width: 40%;
}
.list-top{
    margin-top: 40px;
}
.button-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    .button-step-text {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        font-size: 30px;
        align-items: center;
    }
    .btn {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin-right: 15px;
        font-size: 100px;
        text-align: center;
        line-height: 150px;
        font-weight: 600;
        color: white;
    }
    .btn1 {
        background: #d382af;
        margin-bottom: 50px;
    }
    .btn2 {
        background: #ab1b40;
    }
    .btn3 {
        margin-right: 0;
        margin-bottom: 50px;
        background: #662f8e;
    }
}
.about {
    border-radius: 20px;
    .left {
        margin: 0px auto;
    }
    .avatar-uploader {
        display: inline-block;
        margin: 0;
    }
    .img-con {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .img-con > div {
        padding: 30px 40px;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 10px;
        background: #000;
    }
    .img-box1 {
        width: 400px;
        height: 400px;
        position: relative;
        margin-bottom: 50px;
        position: relative;
        background: white;
        .btn {
            position: absolute;
            width: 30px;
            height: 24px;
            background: url("../assets/arr.png");
            background-size: 100% 100%;
            &.left {
                top: 50%;
                left: -27px;
                margin-top: -15px;
                transform: rotate(90deg);
            }
            &.top {
                top: -24px;
                left: 50%;
                margin-left: -15px;
                transform: rotate(180deg);
            }
            &.right {
                transform: rotate(270deg);
                top: 50%;
                right: -27px;
                margin-top: -15px;
                padding: 0;
            }
            &.bottom {
                bottom: -24px;
                left: 50%;
                margin-left: -15px;
                transform: rotate(360deg);
            }
        }
        canvas {
            width: 100%;
            height: 100%;
            position: relative;
        }
        .drag-it-dude {
            border: 5px solid #eeeeee;
        }
    }
    .img-box2 {
        margin-bottom: 25px;
        width: 400px;
        height: 400px;
        background: white;
        canvas {
            width: 100%;
            height: 100%;
            position: relative;
        }
    }
    .s-list {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .style-list {
        display: flex;
        justify-content: space-between;
        .list-name {
            width: 150px;
            text-align: left;
            display: flex;
            align-items: center;
            font-size: 20px;
        }
        .w100{
            width: 100px;
        }
        .silder {
            width: 250px;
        }
    }
    .right {
        padding: 30px 40px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 20px auto;
        background: #000;
        .resImg {
            margin-bottom: 10px;
            width: 500px;
            height: 500px;
            background: white;
            img {
                width: 100%;
            }
        }
        .rignt-btn {
            width: 300px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .button-step {
                margin-bottom: 20px;
            }
            .btn-text {
                color: white;
                font-size: 24px;
                text-align: center;
                p {
                    margin: 0;
                    &.text-top {
                        margin: 20px 0 10px;
                    }
                }
            }
        }
    }
}
</style>