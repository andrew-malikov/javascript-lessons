const SCALEX_PATTERN = /-?(\d+\.)?\d+/g;

const LEFT = -1;
const RIGHT = 1;
const ENABLED = 'enable';
const DISABLED = 'disable';

function RawShips() {
    let ships = [{
            url: "resources/svg/ship-01.svg",
            direction: LEFT,
            size: {
                width: 64,
                height: 64
            }
        },
        {
            url: "resources/svg/ship-02.svg",
            direction: RIGHT,
            size: {
                width: 64,
                height: 64
            }
        },
        {
            url: "resources/svg/ship-03.svg",
            direction: RIGHT,
            size: {
                width: 64,
                height: 64
            }
        },
        {
            url: "resources/svg/ship-04.svg",
            direction: RIGHT,
            size: {
                width: 64,
                height: 64
            }
        },
        {
            url: "resources/svg/ship-05.svg",
            direction: RIGHT,
            size: {
                width: 64,
                height: 64
            }
        }
    ];

    this.getRawShip = function (index) {
        return ships[index % ships.length];
    };
};

function Ship(shipURLs, shipIndex, position, speed, depth) {
    let self = this;

    let image = document.createElement('img');
    let rawShip = shipURLs.getRawShip(shipIndex);
    let direction = rawShip.direction;
    let state = DISABLED;

    image.setAttribute('src', rawShip.url);
    image.setAttribute('width', rawShip.size.width);
    image.setAttribute('height', rawShip.size.height);
    image.style.zIndex = depth;
    image.style.transform = 'scalex(1)';

    function move() {
        let leftPosition = self.getLeft();
        let rightPosition = leftPosition + rawShip.size.width;

        if (leftPosition <= 0) {
            direction = RIGHT;
            horizontalFlip();
        } else if (rightPosition >= document.body.clientWidth) {
            direction = LEFT;
            horizontalFlip();
        }

        self.updateLeft(speed * direction);

        if (state === ENABLED) requestAnimationFrame(move);
    };

    function horizontalFlip() {
        let originalValue = image.style.transform.match(SCALEX_PATTERN)[0];
        image.style.transform = `scalex(${originalValue*(-1)})`;
    };

    this.run = function () {
        state = ENABLED;
        requestAnimationFrame(move);
    };

    this.stop = function () {
        state = DISABLED;
    }

    this.getLeft = function () {
        if (image.style.left === '')
            return 0;
        return parseInt(image.style.left);
    };

    this.setLeft = function (value) {
        image.style.left = `${value}px`;
    };

    this.updateLeft = function (value) {
        self.setLeft(value + self.getLeft());
    };

    this.getTop = function () {
        if (image.style.top === '')
            return 0;
        return parseInt(image.style.top);
    };

    this.setTop = function (value) {
        image.style.top = `${value}px`;
    };

    this.updateTop = function (value) {
        self.setTop(value + self.getTop());
    };

    this.setOriginalPosition = function () {
        self.setLeft(position.left);
        self.setTop(position.top);
    };

    this.image = function () {
        return image;
    };

};

function ShipManager() {
    let ships = new Array();
    let shipURLs = new RawShips();

    let windowSize = {
        width: document.body.clientWidth,
        height: innerHeight
    };

    function getShip(shipNumber) {
        return new Ship(
            shipURLs,
            shipNumber, {
                top: getRandomNumber((windowSize.height / 2) - 32, (windowSize.height / 2) + 32),
                left: getRandomNumber(windowSize.width/8, 7*windowSize.width/8)
            },
            getRandomNumber(1, 10),
            shipNumber
        );
    }

    this.appendShipsToElement = function (element, shipCount) {
        for (let i = 0; i < shipCount; i++) {
            let ship = getShip(i);
            ships.push(ship);
            element.appendChild(ship.image());
            ship.setOriginalPosition();
        }
    };

    this.runAllShips = function () {
        ships.forEach(ship => {
            ship.run();
        });
    };

    this.stopAllShips = function () {
        ships.forEach(ship => {
            ship.stop();
        });
    };
};

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

let shipManager = new ShipManager();
shipManager.appendShipsToElement(document.body, 7);