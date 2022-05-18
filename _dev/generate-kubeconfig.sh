kubectl config set-credentials ns-default-user \
    --kubeconfig _dev/kubeconfig.yml \
    --embed-certs=true \
    --client-certificate=${CERT_DIR}/${KATEDRA2_USER}.crt \
    --client-key=${CERT_DIR}/${KATEDRA2_USER}.key