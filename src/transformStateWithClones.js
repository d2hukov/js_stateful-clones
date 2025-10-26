'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state };

  for (const action of actions) {
    if (action.type === 'clear') {
      currentState = {};
    }

    if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
    }

    if (action.type === 'removeProperties') {
      currentState = Object.fromEntries(
        Object.entries(currentState).filter(
          ([key]) => !action.keysToRemove.includes(key),
        ),
      );
    }

    history.push({ ...currentState });
  }

  return history;
}

module.exports = transformStateWithClones;
