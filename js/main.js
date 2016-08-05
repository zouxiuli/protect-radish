(function () {
    $(document).ready(function () {

        // @@ 基本功能对象
        function ProtectRadish() {

        }
        ProtectRadish.prototype = {
            constructor: ProtectRadish,
            // ** 触发器函数
            fire: function (handler, param) {
                handler&&handler(param);
            },
            // ** 拖放守卫样例
            dragAndDrop: function () {
                var targetData;
                $(".guarders.example").on("dragstart", function (event) {
                    targetData = event.target.id;
                });
                $(".main-content").on("dragover", $(".lines .item"), function (event) {
                    event.preventDefault();
                });
                $(".main-content").on("drop", $(".lines .item"), function (event) {
                    event.preventDefault();
                    var example = document.getElementById(targetData).cloneNode(),
                        posX,
                        posY;
                    event.target.appendChild(example);
                    posX = event.target.offsetLeft;
                    posY = event.target.offsetTop;

                    // ** 创建守卫实例
                    switch (true) {
                        case !!($(example).hasClass("guarder-leaf")) :
                            var param = {
                                typeName: "leaf",
                                level: 1,
                                aggressivity: 20,
                                cost: 100,
                                guarder: $(".guarder-leaf"),
                                guarderWeapon: $(".guarder-leaf .guarder-weapon"),
                                speed: 10,
                                posX: posX,
                                posY: posY
                            };
                            new GuarderLeaf(param);
                            break;
                        case !!($(example).hasClass("guarder-anchor")) :
                            new GuarderAnchor();
                            break;
                        default:
                            break;
                    }
                });
            }
        };

        // @@ 坏蛋 构造函数
        function BadEggs(property) {
            this.level = property.level;
            this.blood = property.blood;
            this.score = property.score;
            this.speed = property.speed;
            this.color = property.color;
            this.egg = property.egg;
        }
        BadEggs.prototype = {
            constructor: BadEggs,
            moveTrail: function () {
                var speed = this.speed;
                var egg = this.egg;
                var that =  this;
                egg.animate({left: "67px"}, speed, that.getPos)
                    .animate({top: "67px"}, speed, that.getPos)
                    .animate({left: "104px"}, speed, that.getPos)
                    .animate({top: "104px"}, speed, that.getPos)
                    .animate({left: "141px"}, speed, that.getPos)
                    .animate({left: "178px"}, speed, that.getPos)
                    .animate({top: "141px"}, speed, that.getPos)
                    .animate({top: "178px"}, speed, that.getPos)
                    .animate({left: "215px"}, speed, that.getPos);
                return this;
            },
            getPos: function () {
                var posXY = [parseFloat($(this).css("left")), parseFloat($(this).css("top"))];
                protectRadish.fire(guarder_leaf.watchEggMove, posXY);
            }
        };

        // @@ 守卫父类 Guarder 构造函数
        function Guarder(property) {
            var propertyIsNull  = (property == undefined);
            this.typeName = propertyIsNull ? undefined : property.typeName;
            this.level = propertyIsNull ? undefined : property.level;
            this.aggressivity = propertyIsNull ? undefined : property.aggressivity;
            this.cost = propertyIsNull ? undefined : property.cost;
            this.guarder = propertyIsNull ? undefined : property.guarder;
            this.guarderWeapon = propertyIsNull ? undefined : property.guarderWeapon;
            this.speed = propertyIsNull ? undefined : property.speed;
            this.posX = propertyIsNull ? 0 : property.posX;
            this.posY = propertyIsNull ? 0 : property.posY;
            this.direction = propertyIsNull ? 0 : property.direction;
        }
        Guarder.prototype = {
            constructor: Guarder,
            watchEggMove: function (param) {
                // console.log(param);
                return this;
            },
            catchEgg: function () {
                
                return this;
            },
            collisionCheck: function () {
                
            }
        };

        // @@ 守卫子类 GuarderLeaf
        function GuarderLeaf(property) {
            Guarder.call(this, property);
        }
        // @@ 守卫子类GuarderLeaf继承父类Guarder
        GuarderLeaf.prototype = new Guarder();
        GuarderLeaf.prototype.constructor = GuarderLeaf;
        GuarderLeaf.prototype.attack = function () {
            var collide = this.collisionCheck();
            var weapon = this.guarderWeapon;
            function innerAttack() {
                weapon.animate({top: "50px"},500);
                setTimeout(innerAttack, 1000);
            }
            setTimeout(innerAttack, 1000);
            return this;
        };

        // @@ 守卫子类GuarderAnchor
        function GuarderAnchor() {

        }

        // @@ 实例
        // ** 坏蛋
        var bad_egg_1 = new BadEggs({
            level: 1,
            blood: 10,
            score: 20,
            speed: 1000,
            egg: $(".bad-egg1")
        });
        var bad_egg_2 = new BadEggs({
            level: 2,
            blood: 50,
            score: 100,
            speed: 700,
            egg: $(".bad-egg2")
        });
        var bad_egg_3 = new BadEggs({
            level: 3,
            blood: 100,
            score: 200,
            speed: 500,
            egg: $(".bad-egg3")
        });
        bad_egg_1.moveTrail();
        // bad_egg_2.moveTrail();
        // bad_egg_3.moveTrail();

        // ** 守卫
        var guarder_leaf = new GuarderLeaf({
            typeName: "leaf",
            level: 1,
            aggressivity: 20,
            cost: 100,
            guarder: $(".guarder-leaf"),
            guarderWeapon: $(".guarder-leaf .guarder-weapon"),
            speed: 10
        });
        guarder_leaf.attack();

        // ** 基本功能实例
        var protectRadish = new ProtectRadish();
        protectRadish.dragAndDrop();

    });
})();