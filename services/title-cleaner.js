
const titleCleaner = (product, brand) => {
    try {

        let color = product.color ? product.color.toLowerCase() : "no_color";
        let title = product.title ? product.title.toLowerCase() : brand;
        let model = product.title ? product.model.toLowerCase() : "no_model";


        cleanTitle = title.replace(/ *\([^)]*\) */g, "")
            //.replace(/(?:\\[rn]|[\r\n]+)+/g, "")
            .replace(/[|&;$%@"<>()]/g, "")
            .trim()
            .replace(/[{()}]/g, "")
            .trim()
            .replace(/\\|\//g, " ")
            .trim()
            .replace(/[,\[\]']+/g, "")
            .trim()
            //.replace("-", " ")
            .replace(" +", " ")
            .replace(",", " ")
            .replace(", ", " ")
            .replace("+", " ")
            .replace("- ", " ")
            .replace(" -", " ")
            .replace(brand, "")
            .trim()
            .replace(brand, "")
            .trim()
            .replace(brand, "")
            .trim()
            .replace(color, "")
            .trim()
            .replace(model, "")
            .trim()
            .replace("2 in 1", "")
            .trim();

        return cleanTitle
    } catch (err) {
        console.log(err);
    }


}


module.exports.titleCleaner = titleCleaner