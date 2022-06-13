import {Point} from "../../src/elliptic-curve/finiteFieldCurve";

export function toBeAt(received: Point, expected: Point) {
  const fail = {
    message: () => `Received point (${received.x}, ${received.y}) but expected point within 0.001 of (${expected.x}, ${expected.y})`,
    pass: false
  };
  const pass = {
    message: () => `Received point (${received.x}, ${received.y}), close enough to (${expected.x}, ${expected.y})`,
    pass: true
  };
  // point at infinity is equal to point at infinity
  if (received.x === null && received.y === null && expected.x === null && expected.y === null)
    return pass;

  // no points are equal to or "near" the point at infinity
  if (received.x === null || received.y === null || expected.x === null || expected.y === null)
    return fail;

  // accept points within 0.001 of each other as being equivalent
  if (!received.x.eq(expected.x) || !received.y.eq(expected.y)) {
    return fail;
  }

  return pass;
}
