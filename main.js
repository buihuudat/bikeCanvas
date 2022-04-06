
var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  var min_size = Math.min(w, h);
  if (r > min_size / 2) r = min_size / 2;
  this.beginPath();
  this.moveTo(x + r, y);
  this.arcTo(x + w, y, x + w, y + h, r);
  this.arcTo(x + w, y + h, x, y + h, r);
  this.arcTo(x, y + h, x, y, r);
  this.arcTo(x, y, x + w, y, r);
  this.closePath();
  return this;
};

function getRads(degrees) {
  return Math.PI * degrees / 180;
}

function getDegrees(rads) {
  return rads * 180 / Math.PI;
}
var canvasBike = function () {
  function canvasBike() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, canvasBike);
    var _props$width =
      props.width,
      width = _props$width === undefined ? 550 : _props$width,
      _props$height = props.height,
      height = _props$height === undefined ? 420 : _props$height,
      _props$proportion = props.proportion,
      proportion = _props$proportion === undefined ? 4 : _props$proportion;
    this.ele = null;
    this.ctx = null;
    this.proportion = proportion,
    this.canvasW = width,
    this.canvasH = height,
    this.canvasBg = "#fff";
    this.color = "#301926",
    this.gearColor = "#160a13"; 
    this.wheelRadius = this.canvasH * .1814;
    this.wheelBorder = 14;
    this.wheelPos = [];
    this.axisDotPos = [];
    this.oneCent = this.canvasW * 0.245;
    this.edge = 360; //this.canvasW - this.oneCent;
    this.animateNum = 0; 
  }
  _createClass(canvasBike, [
    {
    key: "componentDodMount",
    value: function componentDodMount() {
      this.ele = document.createElement("canvas");
      this.ele.width = this.canvasW;
      this.ele.height = this.canvasH;
      this.ele.style.backgroundColor = this.canvasBg;
      document.body.appendChild(this.ele);
      this.ctx = this.ele.getContext("2d");
      this.run();
      return this.ctx;
    }
  }, {
    key: "run",
    value: function run() {
      var _this = this;
      this.horizon();
      this.ctx.restore();
      var _requestAnimationFrame_ = window.requestAnimationFrame || window.WebkitRequestAnimationFrame;
      this.animateNum += 3;
      _requestAnimationFrame_(function () {
        return _this.run();
      });
      this.animateNum = this.animateNum > this.edge ? 6 : this.animateNum;
    }
  }, {
    key: "horizon",
    value: function horizon() {
      var _this2 = this;
      this.wheelPos = [];
      this.ctx.save();
      this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);

      var horizonX = 0,
        horizonY = this.canvasH - 100;
      // this.ctx.beginPath();
      // this.ctx.strokeStyle = this.color;
      // this.ctx.lineWidth = 6;
      // this.ctx.moveTo(horizonX, horizonY);
      // this.ctx.lineTo(this.canvasW, horizonY);
      // this.ctx.closePath();
      // this.ctx.stroke();

      Array.from({
        length: 5
      }).map(function (k, v) {
        var dotProportion = _this2.canvasW * 0.49 * v - _this2.oneCent;
        _this2.wheelPos.push({
          x: dotProportion,
          y: horizonY - _this2.wheelRadius
        });
        var startX = dotProportion - _this2.animateNum * 2; 
        _this2.ctx.beginPath();
        _this2.ctx.strokeStyle = "#f9f8ef";
        _this2.ctx.lineWidth = 6;
        _this2.ctx.moveTo(startX, horizonY);
        _this2.ctx.lineTo(startX + 5, horizonY);
        _this2.ctx.closePath();
        _this2.ctx.stroke();
      });
      this.ctx.restore();
      this.wheel();
    }
  }, {
    key: "wheel",
    value: function wheel() {
      var _this4 = this;

      this.wheelPos = this.wheelPos.slice(1, 3);
      this.wheelPos.map(function (wheelItem, v) {
        var wheelItemX = wheelItem.x,
          wheelItemY = wheelItem.y - _this4.wheelBorder / 1.5;

        _this4.ctx.beginPath();
        _this4.ctx.lineWidth = _this4.wheelBorder;
        _this4.ctx.fillStyle = "#f5f5f0";
        _this4.ctx.strokeStyle = _this4.color;
        _this4.ctx.arc(wheelItemX, wheelItemY, _this4.wheelRadius, 0, Math.PI * 2, false);
        _this4.ctx.closePath();
        _this4.ctx.stroke();
        _this4.ctx.fill();

        var scaleMultiple = _this4.wheelRadius * .94;
        var speed1 = _this4.animateNum * 2;
        var speed2 = _this4.animateNum * 3;
        if (v === 0) {
          _this4.ctx.beginPath();
          var circleGrd = _this4.ctx.createRadialGradient(wheelItemX, wheelItemY, 18, wheelItemX,
            wheelItemY, scaleMultiple);
          circleGrd.addColorStop(0, "#584a51");
          circleGrd.addColorStop(1, "#11090d");
          _this4.ctx.fillStyle = circleGrd;
          _this4.ctx.arc(wheelItemX, wheelItemY, scaleMultiple, 0, Math.PI * 2, false);
          _this4.ctx.fill();
          _this4.ctx.closePath();

          [{
              lineW: 2,
              radius: scaleMultiple * .6,
              sAngle: getRads(-135 + speed1),
              eAngle: getRads(110 + speed1)
            },
            {
              lineW: 1.2,
              radius: scaleMultiple * .45,
              sAngle: getRads(45 + speed2),
              eAngle: getRads(-50 + speed2)
            }
          ].
          map(function (k, v) {
            _this4.ctx.beginPath();
            _this4.ctx.lineCap = "round";
            _this4.ctx.strokeStyle = "#fff";
            _this4.ctx.lineWidth = k.lineW;
            _this4.ctx.arc(wheelItemX, wheelItemY, k.radius, k.sAngle, k.eAngle, true);
            _this4.ctx.stroke();
            _this4.ctx.closePath();

          });
          _this4.ctx.restore();

        } else {
          _this4.ctx.beginPath();
          var innerRingLineW = _this4.wheelBorder * .357,
            innerRingR = scaleMultiple * .95;
          _this4.ctx.strokeStyle = "#341e2b";
          _this4.ctx.lineWidth = innerRingLineW;
          _this4.ctx.arc(wheelItemX, wheelItemY, innerRingR, 0, Math.PI * 2, false);
          _this4.ctx.stroke();
          _this4.ctx.closePath();
          Array.from({
            length: 3
          }).map(function (k, v) {
            var prevIndex = v - 1 <= 0 ? 0 : v - 1;
            var eAngle = v * 135,
              sAngle = -45 + prevIndex * 45 + v * 90;
            var radius = scaleMultiple * .75;
            var _color_ = "#120008";
            _this4.ctx.beginPath();
            _this4.ctx.lineCap = "round";
            _this4.ctx.strokeStyle = _color_;
            _this4.ctx.lineWidth = 3.5;
            _this4.ctx.arc(wheelItemX, wheelItemY, radius, getRads(sAngle + speed1), getRads(
              eAngle + speed1), false);
            _this4.ctx.stroke();
            _this4.ctx.closePath();

            if (v < 2) {
              var eAngleSmaller = 15 + v * 210,
                sAngleSmaller = -30 + v * 90;
              var radiusSmaller = scaleMultiple * .45;
              _this4.ctx.beginPath();
              _this4.ctx.lineCap = "round";
              _this4.ctx.strokeStyle = _color_;
              _this4.ctx.lineWidth = 3;
              _this4.ctx.arc(wheelItemX, wheelItemY, radiusSmaller, getRads(sAngleSmaller + speed2),
                getRads(eAngleSmaller + speed2), false);
              _this4.ctx.stroke();
              _this4.ctx.closePath();
            }
            _this4.ctx.restore();
          });
        }
        _this4.axisDot(wheelItemX, wheelItemY);
        _this4.ctx.restore();
      });
      this.ctx.restore();
      this.carBracket();
    }
  }, {
    key: "axisDot",
    value: function axisDot(
      x, y) {
      var fillColor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "transparent";
      var radius = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 9;
      this.axisDotPos.push({
        x: x,
        y: y
      });
      this.ctx.beginPath();
      this.ctx.lineCap = "round";
      this.ctx.strokeStyle = "#120008";
      this.ctx.lineWidth = 4;
      this.ctx.fillStyle = fillColor;
      this.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.fill();
    }
  }, {
    key: "polygon",
    value: function polygon(discX, discY, coordinateX, coordinateY, polygon1X, polygon1Y, polygon2X,
      polygon2Y, height) {
      var coordinateW = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 6;

      this.ctx.beginPath();
      this.ctx.strokeStyle = this.gearColor;
      this.ctx.lineWidth = coordinateW;
      this.ctx.moveTo(polygon1X, polygon1Y);
      this.ctx.lineTo(coordinateX, height);
      this.ctx.lineTo(discX, discY);
      this.ctx.lineTo(polygon2X, polygon1Y + 5);
      this.ctx.lineTo(polygon2X - 5, polygon1Y);
      this.ctx.lineTo(polygon1X, polygon1Y);
      this.ctx.closePath();
      this.ctx.stroke();
    }
  }, {
    key: "carBracket",
    value: function carBracket()
    {
      var _this6 = this;

      var coordinateW = 6;
      var discX = this.wheelPos[0].x + this.wheelRadius * 1.6,
        discY = this.wheelPos[0].y - coordinateW * 2.5;

      var coordinateX = this.wheelPos[0].x,
        coordinateY = this.wheelPos[0].y - this.wheelRadius * .19;

      var polygonX1 = this.wheelRadius + coordinateX,
        polygonY1 = coordinateY - this.wheelRadius * 1.29;
      var polygonX2 = this.wheelPos[1].x - 40,
        polygonY2 = polygonY1;

      var polygonH1 = polygonY1 + 120 * Math.sin(Math.PI / 3);

      this.polygon(discX, discY, coordinateX, coordinateY, polygonX1, polygonY1, polygonX2, polygonY2,
        polygonH1);

      var lever1X = polygonX2,
        lever1Y = polygonY2;

      var lever2X = discX - 62,
        lever2Y = discY - 135;

      var lever3X = lever1X,
        lever3Y = polygonY1 + 10;
      // this.occlusion(lever3X,lever3Y);

      [{
          moveX: this.wheelPos[1].x - coordinateW / 2,
          moveY: this.wheelPos[1].y - 18,
          lineX: lever1X - 20,
          lineY: lever1Y - 45,
          lineW: coordinateW
        },
        {
          moveX: discX,
          moveY: discY,
          lineX: lever2X,
          lineY: lever2Y,
          lineW: coordinateW + 2
        },

        {
          moveX: discX,
          moveY: discY,
          lineX: lever3X,
          lineY: lever3Y,
          lineW: coordinateW + 2
        }
      ].

      map(function (k, v) {

        _this6.ctx.beginPath();
        _this6.ctx.lineCap = "round";
        _this6.ctx.strokeStyle = _this6.gearColor;
        _this6.ctx.lineWidth = k.lineW || coordinateW;
        _this6.ctx.moveTo(k.moveX, k.moveY);
        _this6.ctx.lineTo(k.lineX, k.lineY);
        _this6.ctx.closePath();
        _this6.ctx.stroke();

      });

      this.ctx.restore();
      var discRadius = this.wheelRadius * .36;
      this.chain(discX, discY, discRadius);
      this.carDisc(discX, discY, coordinateW, discRadius);
      this.axisDot(this.axisDotPos[0].x, this.axisDotPos[0].y, "#fff", 6.5);
      this.seat(discX, discY);
      this.steering(lever1X, lever1Y, coordinateW / 1.2);
    }
  }, {
    key: "seat",
    value: function seat(
      discX, discY) {
      var _ctx, _ctx2;
      this.ctx.restore();
      var seatX = discX - 85,
        seatY = discY - 140;
      var curve1Cpx = [seatX - 5, seatY + 30, seatX + 75, seatY + 8];
      var curve2Cpx = [seatX + 85, seatY - 5, seatX, seatY];
      this.ctx.beginPath();
      this.ctx.fillStyle = this.gearColor;
      var grd = this.ctx.createLinearGradient(seatX, seatY, seatX + 10, seatY + 60); 
      grd.addColorStop(0, "#712450");
      grd.addColorStop(1, "#11090d");
      this.ctx.fillStyle = grd;
      this.ctx.moveTo(seatX, seatY);
      (_ctx = this.ctx).quadraticCurveTo.apply(_ctx, curve1Cpx);
      (_ctx2 = this.ctx).quadraticCurveTo.apply(_ctx2, curve2Cpx);
      this.ctx.fill();
    }
  }, {
    key: "steering",
    value: function steering(
      lever1X, lever1Y, coordinateW) {
      var _ctx3, _ctx4;
      var steeringX = lever1X - 20,
        steeringY = lever1Y - 45;
      var steeringStep1 = [steeringX + 40, steeringY - 10, steeringX + 40, steeringY - 10, steeringX + 35,
        steeringY + 15
      ];
      var steeringStep2 = [steeringX + 30, steeringY + 25, steeringX + 25, steeringY + 23, steeringX + 18,
        steeringY + 23
      ];
      this.ctx.beginPath();
      this.ctx.lineCap = "round";
      this.ctx.strokeStyle = "#712450";
      this.ctx.lineWidth = coordinateW;
      this.ctx.moveTo(steeringX, steeringY); //40 60;
      (_ctx3 = this.ctx).bezierCurveTo.apply(_ctx3, steeringStep1);
      (_ctx4 = this.ctx).bezierCurveTo.apply(_ctx4, steeringStep2);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }, {
    key: "carDisc",
    value: function carDisc(

      coordinateX, coordinateY, coordinateW, _discRadius) {
      var discX = coordinateX,
        discY = coordinateY;
      var discRadius = _discRadius || this.wheelRadius * .36;

      this.ctx.beginPath();
      this.ctx.fillStyle = this.color;
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = "#0f080d";
      this.ctx.arc(discX, discY, discRadius, 0, Math.PI * 2, false);
      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.fill();
      this.ctx.beginPath();
      this.ctx.strokeStyle = "#fff";
      this.ctx.lineWidth = 2;
      this.ctx.arc(discX, discY, discRadius * .7, 0, Math.PI * 2, false);
      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.fillStyle = "#fff";
      this.ctx.arc(discX, discY, 5, 0, Math.PI * 2, false);
      this.ctx.closePath();
      this.ctx.fill();

      this.discGear(discX, discY, coordinateW);
    }
  }, {
    key: "discGear",
    value: function discGear(
      coordinateX, coordinateY, coordinateW) {
      var _this7 = this;
      var discX = coordinateX,
        discY = coordinateY;
      var discRadius = this.wheelRadius * .36;

      var discDotX = discX + discRadius + 8,
        discDotY = discRadius / .98;
      this.ctx.restore();
      this.ctx.save();
      this.ctx.translate(discX, discY);

      Array.from({
        length: 30
      }).map(function (v, index) {
        var radian = Math.PI / 15; //index*(Math.PI / 30); //360 = 2 * Math.PI / singleAngle/2
        _this7.ctx.beginPath();
        _this7.ctx.lineCap = "round";
        _this7.ctx.strokeStyle = _this7.color;
        _this7.ctx.rotate(radian);
        _this7.ctx.lineWidth = 1.5;
        _this7.ctx.moveTo(0, discDotY);
        _this7.ctx.lineTo(1, discDotY);
        // ctx.arc(discDotX,discDotY,6,0,Math.PI*2,false);
        _this7.ctx.closePath();
        _this7.ctx.stroke();

      });
      this.pedal(discX, discY, discRadius);
      this.pedal(discX, discY, discRadius, 1);

      this.ctx.restore();
    }
  }, {
    key: "pedal",
    value: function pedal(

      coordinateX, coordinateY, discRadius) {
      var turnAngle = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var pedalX = coordinateX,
        pedalY = coordinateY - discRadius * .7;
      var pedalW = 6,
        pedalH = discRadius * 1.9;
      var radian = this.animateNum * (Math.PI / 180);
      var radianHor = this.animateNum * (Math.PI / 180);
      var turnAngleNum = 1;
      var moveY = 28;
      if (turnAngle !== 0) {
        this.ctx.rotate(-180 * (Math.PI / 180));
        turnAngleNum = Math.PI / 180;
      };
      this.ctx.beginPath();
      this.ctx.rotate(radian * turnAngleNum);
      this.ctx.lineCap = "round";
      this.ctx.strokeStyle = this.gearColor;
      this.ctx.lineWidth = pedalW;
      this.ctx.moveTo(-1, moveY);
      this.ctx.lineTo(0, pedalH);
      this.ctx.closePath();
      this.ctx.stroke();

      this.ctx.save();
      var pedalHorW = pedalH / 1.5,
        pedalHorH = pedalW;
      this.ctx.translate(0, pedalH);
      this.ctx.beginPath();
      this.ctx.rotate(-radianHor);

      this.ctx.lineCap = "round";
      this.ctx.fillStyle = "#fff";
      this.ctx.strokeStyle = this.gearColor;
      this.ctx.lineWidth = 2;
      this.ctx.roundRect(-pedalHorW / 2, -2, pedalHorW, pedalHorH, 5);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();

      this.ctx.restore();
    }
  }, {
    key: "chain",
    value: function chain(
      coordinateX, coordinateY, discRadius) {
      var chainW = (coordinateX + discRadius - this.wheelPos[0].x) / 2;
      var chainX = this.wheelPos[0].x + chainW - 5;
      var chainY = coordinateY;
      this.ctx.save();
      this.ctx.translate(chainX, chainY + 4.8);
      this.ctx.rotate(-2 * (Math.PI / 180));
      var r = chainW + chainW * .06,
        h = discRadius / 2;
      this.ctx.beginPath();
      this.ctx.moveTo(-r, -1);
      this.ctx.lineWidth = 3;
      this.ctx.strokeStyle = "#1e0c1a";
      this.ctx.bezierCurveTo(-r, h * 1.5, r, h * 4, r, 0);
      this.ctx.bezierCurveTo(r, -h * 4, -r, -h * 1.5, -r, 0);
      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.restore();
    }
  }]);
  return canvasBike;
}();


var Bike = new canvasBike();
var bk = Bike.componentDodMount();


// Bike 3d animate
function createScene() {
  var h = window.innerHeight;
  var w = window.innerWidth;

  // create scene
  var scene = new THREE.Scene();

  // create camera
  const aspectRadio = w / h;
  const fieldOfView = 60;
  const nearPlane = 1;
  const farPlane = 1000;
  const camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRadio,
    nearPlane,
    farPlane
  );

  camera.position.x = 0;
  camera.position.y = 100;
  camera.position.z = 200;

  // create renderer
  var renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });

  renderer.serSize(w, h);

  renderer.shadowMap.enabled = true;

  
}

