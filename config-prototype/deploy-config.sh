#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "${DIR}"

KUBECONFIG_PATH="${DIR}/../_dev/kubeconfig.yml"

kubectl --kubeconfig "${KUBECONFIG_PATH}" \
    create configmap config-prototype \
    --from-file="config.yml=${DIR}/config.yml"