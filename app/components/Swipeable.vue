<template>
    <Page class="page">
        <ActionBar title="Home" class="action-bar" />
        <StackLayout>
            <AbsoluteLayout>
                <GridLayout style="z-index:1" columns="*,*" width="100%"
                    paddingTop="20">
                    <Label ref="no" col="0" text="🗡️" class="btn no" />
                    <Label ref="yes" col="1" text="🤝" class="btn yes" />
                </GridLayout>
                <Label class="h1" width="100%" text="Fetch a new friend!" />
            </AbsoluteLayout>
            <GridLayout rows="*" columns="*">
                <SwipeLayout v-for="dog in dogs" :key="dog.id" row="0" col="0"
                    :animationState="swipeLayoutAnimated" @swipeLeft="swipeLeftCallback($event)"
                    @swipeRight="swipeRightCallback($event)">.
                    <image class="card" :src="dog" stretch="aspectFill"></image>
                </SwipeLayout>
            </GridLayout>
        </StackLayout>
    </Page>
</template>

<script>
    const http = require("http");
    const Animation = require("ui/animation");
    export default {
        data() {
            return {
                dogArray: [],
                dogs: [],
                swipeLayoutAnimated: "ON_EVENTS"
            };
        },
        methods: {
            getMultiDogs() {
                http.request({
                        url: "https://dog.ceo/api/breeds/image/random/15",
                        method: "GET"
                    })
                    .then(response => {
                        this.dogArray = JSON.parse(response.content);
                        for (let i = 0; i < 15; i++) {
                            this.dogs.push(this.dogArray.message[i]);
                        }
                        console.log(JSON.stringify(this.dogs));
                    })
                    .catch(e => {
                        alert("error");
                    });
            },

            swipeRightCallback(e) {
                this.$refs.yes.nativeView.animate({
                    opacity: 1
                }).then(() => {
                    this.$refs.yes.nativeView.animate({
                        opacity: 0
                    }).then(() => {
                        this.next();
                    })
                })
            },
            swipeLeftCallback(e) {
                this.$refs.no.nativeView.animate({
                        opacity: 1
                    })
                    .then(() => {
                        this.$refs.no.nativeView.animate({
                            opacity: 0
                        }).then(() => {
                            this.next();
                        })
                    })
            },
            next() {
                this.dogs.pop();
                console.log(this.dogs.length);
                if (this.dogs.length == 0) {
                    alert("Loading some more!");
                    this.getMultiDogs();
                }
            }
        },
        created() {
            this.getMultiDogs();
        }
    };
</script>

<style scoped>

/* @import 'nativescript-theme-core/css/core.light.css';
 */
.card {
	margin: 10;
	z-index: 0;
	border-radius: 5;
}

.action-bar {
	background-color: white;
	color: red;
}

.btn {
	z-index: 1;
	padding: 5;
	border-width: 5;
	border-radius: 5;
	background-color: white;
	text-align: center;
	font-size: 40px;
	opacity: 0;
}

.h1 {
	text-align: center;
	padding-top: 40;
}
.yes {
	color: green;
	border-color: green;
	transform: rotate(15deg);
}

.no {
	color: red;
	border-color: red;
	transform: rotate(-15deg);
}

.home-panel {
    vertical-align: center;
    font-size: 20;
    margin: 15;
}

.description-label {
    margin-bottom: 15;
}
</style>