var cirelli = cirelli || {};
(function(cirelli) {
    'use strict';
    
    const ELEMENT_COUNT = 3*3;

    class Matrix2x2 {
        static add(m1, m2){
            return new Matrix2x2(
                m1.matrix[0] + m2.matrix[0],
                m1.matrix[1] + m2.matrix[1],
                m1.matrix[2] + m2.matrix[2],
                m1.matrix[3] + m2.matrix[3]
            );
        }

        static sub(m1, m2){
            return new Matrix2x2(
                m1.matrix[0] - m1.matrix[0],
                m1.matrix[1] - m2.matrix[1],
                m1.matrix[2] - m2.matrix[2],
                m1.matrix[3] - m2.matrix[3]
            );
        }

        static scalarMult(m1, s){
            return new Matrix2x2(
                m1.matrix[0] * s,
                m1.matrix[1] * s,
                m1.matrix[2] * s,
                m1.matrix[3] * s
            );
        }

        static scalarDiv(m1, s){
            return new Matrix2x2(
                m1.matrix[0] / s,
                m1.matrix[1] / s,
                m1.matrix[2] / s,
                m1.matrix[3] / s
            );
        }
        
        static rotationMatrix(theta){
            let ct = Math.cos(theta),
                st = Math.sin(theta);

            return new Matrix2x2(ct, st, -st, ct);
        }
 
        static inverseRotationMatrix(theta){
            let ct = Math.cos(theta),
                st = Math.sin(theta);

            return new Matrix2x2(ct, -st, st, ct);
        }

        //| 0, 1 |  | 0, 1 |
        //| 2, 3 |  | 2, 3 |
        // AB != BA
        // (AB)C = A(BC)
        // A(B + C) = AB + AC
        static mult(m1, m2){
            return new Matrix2x2(
                m1.matrix[0] * m2.matrix[0] + m1.matrix[1] * m2.matrix[2],
                m1.matrix[0] * m2.matrix[1] + m1.matrix[1] * m2.matrix[3],
                m1.matrix[2] * m2.matrix[0] + m1.matrix[3] * m2.matrix[2],
                m1.matrix[2] * m2.matrix[1] + m1.matrix[3] * m2.matrix[3]
            );
        }

        static transpose(m){
            return new Matrix2x2(
                m.matrix[0],
                m.matrix[2],
                m.matrix[1],
                m.matrix[3]
            );
        }
        
        static determinant(m){
            return m.matrix[0] * m.matrix[3] - m.matrix[1] * m.matrix[2];
        }
        
        static inverse(m){
            let det = Matrix2x2.determinant(m);
            if(det === 0){
                throw new Error(Matrix2x2.DETERMINANT_IS_ZERO);
            }

            return new Matrix2x2(
                m.matrix[3]/det, m.matrix[1]/det, m.matrix[2]/det, m.matrix[0]/det
            );
        }

        constructor(m00, m01, m10, m11){
            this.matrix = new Array(ELEMENT_COUNT);

            this.matrix[0] = m00 || 0;
            this.matrix[1] = m01 || 0;
            this.matrix[2] = m10 || 0;
            this.matrix[3] = m11 || 0;
        }

        clear(){
            this.matrix[0] = 0;
            this.matrix[1] = 0;
            this.matrix[2] = 0;
            this.matrix[3] = 0;
        }
        
        add(m){
            this.matrix[0] += m.matrix[0];
            this.matrix[1] += m.matrix[1];
            this.matrix[2] += m.matrix[2];
            this.matrix[3] += m.matrix[3];
            return this;
        }

        sub(m){
            this.matrix[0] -= m.matrix[0];
            this.matrix[1] -= m.matrix[1];
            this.matrix[2] -= m.matrix[2];
            this.matrix[3] -= m.matrix[3];
            return this;   
        }

        scalarMult(s){
            this.matrix[0] *= m.matrix[0];
            this.matrix[1] *= m.matrix[1];
            this.matrix[2] *= m.matrix[2];
            this.matrix[3] *= m.matrix[3];
            return this;
        }
 
        scalarDiv(s){
            this.matrix[0] /= m.matrix[0];
            this.matrix[1] /= m.matrix[1];
            this.matrix[2] /= m.matrix[2];
            this.matrix[3] /= m.matrix[3];
            return this;
        }

        mult(m){
            return new Matrix2x2(
                this.matrix[0] * m.matrix[0] + this.matrix[1] * m.matrix[2],
                this.matrix[0] * m.matrix[1] + this.matrix[1] * m.matrix[3],
                this.matrix[2] * m.matrix[0] + this.matrix[3] * m.matrix[2],
                this.matrix[2] * m.matrix[1] + this.matrix[3] * m.matrix[3]
            );
        }

        transpose(){
            return new Matrix2x2(
                this.matrix[0],
                this.matrix[2],
                this.matrix[1],
                this.matrix[3]
            );
        }

        determinant(){
            return this.matrix[0] * this.matrix[3] - this.matrix[1] * this.matrix[2];
        }

        inverse(){
            let det = this.determinant()

            if(det === 0){
                throw new Error(Matrix2x2.DETERMINANT_IS_ZERO);
            }

            return new Matrix2x2(
                this.matrix[3]/det, this.matrix[1]/det, this.matrix[2]/det, this.matrix[0]/det
            );
        }
    }

    Matrix2x2.IDENTITY_MATRIX = new Matrix2x2(1, 0, 0 ,1);
    Matrix2x2.UNIT_MATRIX     = Matrix2x2.IDENTITY_MATRIX;
    Matrix2x2.DETERMINANT_IS_ZERO = 'Can\'t invert a matrix that has a determinant of 0.';

    cirelli.Matrix2x2 = Matrix2x2;
})(cirelli);
