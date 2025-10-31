FROM node:14

# কন্টেইনারের মধ্যে কাজ করার ডিরেক্টরি সেট করব
WORKDIR /usr/src/app

# প্যাকেজ ম্যানেজার প্যাকেজগুলির তালিকা কপি করব
COPY package*.json ./

# Node.js প্যাকেজ ইনস্টল করব
RUN npm install

# সমস্ত সোর্স কোড কপি করব
COPY . .

# কন্টেইনারে 3001 পোর্ট ওপেন করব
EXPOSE 3001

# সার্ভার চালু করার কমান্ড
CMD ["node", "server.js"]


