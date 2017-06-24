var cirelli = cirelli || {};
(function(cirelli, Math) {
    'use strict';
    cirelli.Vector = function Vector(x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    };

    cirelli.Vector.prototype = {
        add:function(v) {
            this.x += v.x;
            this.y += v.y;
            this.z += v.z;
            return this;
        },
        sub:function(v) {
            this.x -= v.x;
            this.y -= v.y;
            this.z -= v.z;
            return this;
        },
        magnitude: function() {
            return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
        },
        scale:function(scalor) {
            this.x *= scalor;
            this.y *= scalor;
            this.z *= scalor;
            return this;
        },

        //The dot product tells you what amount of one vector goes in the direction of another.
        dot:function(v) {
            return this.x * v.x + this.y * v.y + this.z * v.z;
        },
        isAtRightAngle: function(v) {
            return this.dot(v) === 0;
        },

        //The Cross Product a × b of two vectors is another vector that is at right angles to both.
        //Right Hand Rule: With your right-hand, point your index finger along vector a, and point your middle finger along vector b: the cross product goes in the direction of your thumb.
        //Example: a x b
        //  cx = aybz − azby = 3×7 − 4×6 = −3
        //  cy = azbx − axbz = 4×5 − 2×7 = 6
        //  cz = axby − aybx = 2×6 − 3×5 = −3
        cross:function(v) {
            return new Vector(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x); 
        },

        equals:function(v) {
            return this.x === v.x && this.y === v.y && this.z === v.z;
        }
    };
    
    cirelli.Vector.ZERO_VECTOR = new cirelli.Vector(0, 0, 0);

    cirelli.Vector.add = function(a, b) {
        return new Vector(a.x + b.x, a.y + b.y, a.z + b.z);
    };

    cirelli.Vector.sub = function(a, b) {
        return new Vector(a.x - b.x, a.y - b.y, a.z - b.z);
    };

    cirelli.Vector.scale = function(v, scalor) {
        return new Vector(v.x * scalor, v.y * scalor, v.z * scalor);
    };

    cirelli.Vector.dot = function(a , b) {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    };
    
    cirelli.Vector.isRightAngle = function(a, b) {
        return cirelli.Vector.dot(a, b) === 0;
    };

    cirelli.Vector.cross = function(a, b) {
        return new Vector(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x); 
    };

    cirelli.Vector.equals = function(a, b) {
        return a.x === b.x && a.y === b.y && a.z === b.z;
    };
    
    cirelli.Vector.isParallel = function(a, b) {
        return cirelli.Vector.equals(cirelli.Vector.cross(a, b), cirelli.Vector.ZERO_VECTOR);
    };
})(cirelli, Math);
