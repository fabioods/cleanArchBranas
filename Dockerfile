FROM node:14.17.0

## Oh my ZSH Configuration
RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.1/zsh-in-docker.sh)" -- \
  -t https://github.com/denysdovhan/spaceship-prompt \
  -a 'SPACESHIP_PROMPT_ADD_NEWLINE="false"' \
  -a 'SPACESHIP_PROMPT_SEPARATE_LINE="false"' \
  -a 'SPACESHIP_USER_SHOW=always' \
  -a 'SPACESHIP_CHAR_SYMBOL="❯"' \
  -a 'SPACESHIP_CHAR_SUFFIX=" "' \
  -a 'SPACESHIP_PROMPT_ORDER=(user dir host git hg exec_time line_sep vi_mode jobs exit_code char)' \
  -p git \
  -p https://github.com/zsh-users/zsh-autosuggestions \
  -p https://github.com/zsh-users/zsh-completions \
  -p https://github.com/zsh-users/zsh-syntax-highlighting


#Git Configuration
RUN git config --global user.name "Fábio dos Santos"
RUN git config --global user.email "fah_ds@live.com"

RUN git config --global core.editor code --wait
RUN git config --global core.autocrlf false
RUN git config --global core.eol lf

RUN git config --global alias.s "!git status -s"
RUN git config --global alias.c "!git add --all && git commit -m"
RUN git config --global alias.l "!git log --pretty=format:'%C(blue)%h %C(red)%d %C(white)%s - %C(cyan)%cn, %C(green)%cr'"
RUN git config --global alias.rh "!git reset --hard"
RUN git config --global alias.cb "!git checkout -b"
RUN git config --global alias.ck "!git checkout"
RUN git config --global alias.com "!git commit -m"

RUN mkdir ~/.ssh

WORKDIR /usr/src/app

CMD ["tail", "-f", "/dev/null"]
