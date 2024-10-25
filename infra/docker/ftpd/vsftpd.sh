#!/bin/bash

set -e
source /etc/container_environment.sh

ANON_ROOT=${ANON_ROOT:-/var/ftp}
PASV_MAX_PORT=${PASV_MAX_PORT:-65515}
PASV_MIN_PORT=${PASV_MIN_PORT:-65500}
PASV_ADDRESS=${PASV_ADDRESS:-}
MAX_PER_IP=${MAX_PER_IP:-2}
MAX_LOGIN_FAILS=${MAX_LOGIN_FAILS:-2}
MAX_CLIENTS=${MAX_CLIENTS:-50}
ANON_MAX_RATE=${ANON_MAX_RATE:-6250000}
FTPD_BANNER=${FTPD_BANNER:-"Welcome to an awesome public FTP Server"}
BANNER_FILE=${BANNER_FILE:-""}
HIDE_FILE=${HIDE_FILE:-""}
DENY_FILE=${DENY_FILE:-""}


# Runtime Configuration Options
# There are a series of available variables you can tune at your own discretion. The defaults are most likely acceptable for most use cases.

# ANON_ROOT - The directory in the container which vsftpd will serve out (default: /var/ftp)
# PASV_MAX_PORT - The maximum port for pasv communiation (default: 65515)
# PASV_MIN_PORT - The minimum port for pasv communication (default: 65500)
# MAX_PER_IP - The maximum connections from one host (default: 2)
# MAX_LOGIN_FAILS - Maximum number of login failures before kicking (default: 2)
# MAX_CLIENTS - Maximum number of simultaneously connected clients (default: 50)
# ANON_MAX_RATE - Maximum bandwidth allowed per client in bytes/sec (default: 6250000)
# FTPD_BANNER - An ftpd banner displayed when a client connects (default: Welcome to an awesome public FTP Server)
# BANNER_FILE - File containing ftpd banner (default: ``)
# listen=YES
# anonymous_enable=YES
# dirmessage_enable=YES
# use_localtime=YES
# connect_from_port_20=YES
# secure_chroot_dir=/var/run/vsftpd/empty
# write_enable=YES
# seccomp_sandbox=NO
# xferlog_std_format=NO
# log_ftp_protocol=YES
# syslog_enable=YES
# hide_ids=YES
# seccomp_sandbox=NO
# pasv_enable=YES
# port_enable=YES
# anon_root=${ANON_ROOT}
# pasv_max_port=${PASV_MAX_PORT}
# pasv_min_port=${PASV_MIN_PORT}
# max_per_ip=${MAX_PER_IP}
# max_login_fails=${MAX_LOGIN_FAILS}
# max_clients=${MAX_CLIENTS}
# anon_max_rate=${ANON_MAX_RATE}
# ftpd_banner=${FTPD_BANNER}
# banner_file=${BANNER_FILE}
# pasv_address=${PASV_ADDRESS}
# hide_file=${HIDE_FILE}
# deny_file=${DENY_FILE}

[ -f /etc/vsftpd.conf ] || cat <<EOF > /etc/vsftpd.conf
listen=YES
anonymous_enable=YES
local_enable=YES
write_enable=YES
dirmessage_enable=YES
use_localtime=YES
xferlog_enable=YES
connect_from_port_20=YES
chroot_local_user=YES
allow_writeable_chroot=YES
pasv_min_port=65500
pasv_max_port=65515
EOF

exec /usr/sbin/vsftpd  