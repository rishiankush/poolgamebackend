FS.HTTP.setBaseUrl('/store');

let imageStore = new FS.Store.GridFS("image", {
    beforeWrite: (fileObj) => {
        return {
            'name': slugify(Date.now() + ' ' + fileObj.original.name)
        }
    },
});

let thumbStore = new FS.Store.GridFS("thumb", {
    beforeWrite: (fileObj) => {
        if (fileObj.isImage()) {
            return {
                'name': slugify(Date.now() + ' ' + fileObj.original.name),
                'extension': 'png',
                'type': 'image/png'
            }
        } else return false;
    },
    transformWrite: (fileObj, readStream, writeStream) => {
        let size = 96;

        if (gm.isAvailable) {
            if (fileObj.isImage()) {
                gm(readStream)
                    .autoOrient()
                    .resize(size, size + '^')
                    .gravity('Center')
                    .extent(size, size)
                    .stream('PNG')
                    .pipe(writeStream);
            } else {
                // console.log('File is not Image/Video.');
                return false;
            }
        } else {
            console.log('graphicsmagick or imagemagick not available on the system');
            return false;
        }
    },
});

Files = new FS.Collection('uploads', {
    stores: [imageStore, thumbStore]
});

Files.allow({
    insert: function(userId, doc) {
        return true;
    },
    update: function(userId, doc, fieldNames, modifier) {
        return true;
    },
    remove: function(userId, doc) {
        return true;
    },
    download: function(userId, fileObj) {
        return true;
    }
});