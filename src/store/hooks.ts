import { createTypedHooks } from 'easy-peasy'

import { StoreModel } from '.'

const { useStoreActions, useStoreState } = createTypedHooks<StoreModel>()

export const useStore = useStoreState
export const useActions = useStoreActions
