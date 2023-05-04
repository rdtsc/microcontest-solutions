#!/usr/bin/env python

import json
import numpy as np
from scipy.integrate import odeint


def get_input(path='input/payload.json'):
  with open(path) as payload:
    return json.load(payload)


def write_output(data, path='output/result.json'):
  with open(path, 'w') as output:
    json.dump(data, output)


def pendulum(y, t, g, length):
  return [y[1], -(g / length) * np.sin(y[0])]


def main():
  conditions = get_input()

  g = 9.81
  time = range(0, 11)
  length = conditions['length']
  system = [np.deg2rad(conditions['angle']), 0]

  lhs = odeint(pendulum, system, time, args=(g, length))
  rhs = pendulum(lhs.transpose(), time, g, length)[1]

  result = np.vstack((lhs.transpose(), rhs))
  result = np.delete(result, 0, axis=1)

  write_output(result.tolist())


if __name__ == '__main__':
  main()
