/**
 * 数学函数扩展
 */
export class MathUtils {
    public static Deg2Rad = 0.0175;
    public static Rad2Deg = 57.2958;

    /**
     * 进制转换
     * 十进制(Decimal)：
     取值数字 0-9；不用前缀。

     二进制(Binary)：
     取值数字 0 和 1 ；前缀 0b 或 0B。

     十六进制(Hexadecimal)：
     取值数字 0-9 和 a-f ；前缀 0x 或 0X。

     八进制(Octal)：
     取值数字 0-7 ；前缀 0o 或 0O (ES6规定)。

     需要注意的是，非严格模式下浏览器支持：
     如果有前缀0并且后面只用到 0-7 八个数字的数值时，该数值视为八进制；
     但如果前缀0后面跟随的数字中有8或者9，则视为十进制。
     严格模式下报错
     * @param num 源数值
     * @param radix 进制基数 2-36
     * @returns
     */
    public static scaleTransform(num: number, radix = 10): string {
        return num.toString(radix);
    }

    public static RandomFromWithWeight<T>(numArr: T[], weightArr: number[]) {
        if (numArr == null || numArr.length == 0) {
            return null;
        }
        let totalWeight = 0;
        for (const weight of weightArr) {
            totalWeight += weight;
        }
        const randomWeight = MathUtils.Random(0, totalWeight);
        let currentWeight = 0;
        for (let i = 0; i < numArr.length; ++i) {
            currentWeight += weightArr[i];
            if (randomWeight < currentWeight) {
                return numArr[i];
            }
        }
        return numArr[numArr.length - 1];
    }

    /**
     * 获取min~max之间的一个整数
     * @param min
     * @param max
     * @returns
     */
    public static RandomInt(min: number, max: number): number {
        return Math.round(this.Random(min, max));
    }

    /**
     * 获取一个随机数min~max之间的一个随机数
     * @param min
     * @param max
     * @returns
     */
    public static Random(min: number, max: number): number {
        if (min == max) {
            return min;
        }
        return (max - min) * Math.random() + min;
    }

    /**
     * 获取一个范围内随机整数
     * @param min 最小值
     * @param max 最大值
     */
    public static randomRangeInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min) + min);
    }

    /**
     * 判定概率命中
     * @param ratio 概率，百分数
     */
    public static RandomRatio(ratio: number): boolean {
        let v = MathUtils.RandomInt(0, 10000) * 0.01;
        return ratio > v;
    }

    public static Clamp(value: number, min: number, max: number): number {
        if (value < min) return min;
        if (value > max) return max;
        return value;
    }

    public static Clamp01(value: number): number {
        return this.Clamp(value, 0, 1);
    }

    /**
     * 获取符号
     * @param value
     * @returns
     */
    public static Sign(value: number): number {
        if (value == 0) return 1;
        return value > 0 ? 1 : -1;
    }

    public static GetNumCount(num: number): number {
        let numberCount = 0;
        let newNumber = num;
        while (newNumber / 10 > 0) {
            newNumber = Math.floor(newNumber / 10);
            numberCount++;
        }
        return numberCount;
    }

    public static Lerp(from: number, to: number, progress: number): number {
        return from + (to - from) * MathUtils.Clamp01(progress);
    }

    public static MoveTowardsAngle(current: number, target: number, maxDelta: number) {
        const num = MathUtils.DeltaAngle(current, target);
        if (0 - maxDelta < num && num < maxDelta) {
            return target;
        }
        target = current + num;
        return MathUtils.MoveTowards(current, target, maxDelta);
    }

    public static MoveTowards(current: number, target: number, maxDelta: number): number {
        if (Math.abs(target - current) <= maxDelta) {
            return target;
        }
        return current + Math.sign(target - current) * maxDelta;
    }

    public static DeltaAngle(current: number, target: number): number {
        let num = MathUtils.Repeat(target - current, 360);
        if (num > 180) {
            num -= 360;
        }
        return num;
    }

    public static Repeat(t: number, length: number): number {
        return MathUtils.Clamp(t - Math.floor(t / length) * length, 0, length);
    }

    public static IsSimilar(n1: number, n2: number) {
        return n1 == n2;
    }
}
