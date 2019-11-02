export default ( selector: string ): string => {
    return selector.substr( 1, selector.length ).trim();
}
